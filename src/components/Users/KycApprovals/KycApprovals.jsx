import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  User,
  Pagination,
  Spinner,
  Avatar,
  useDisclosure,
} from "@nextui-org/react";
import { BsSearch } from "react-icons/bs";
import { columns, statusOptions } from "./data";
import {
  useApproveKycMutation,
  useGetKycQuery,
} from "@/services/api/usersApi/kycApi";
import { toastError, toastSuccess } from "@/components/Toast/Toast";
import { CheckIcon } from "@radix-ui/react-icons";
import { ImageFetch } from "@/hooks/users/ImageFetch";
import ViewImageModal from "./ViewImageModal";

const statusColorMap = {
  active: "success",
  pending: "danger",
  vacation: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "username",
  "email",
  "id_card_expiry",
  "kyc_image",
  "id_card_front",
  "id_card_back",
  "actions",
];

export default function KycApprovals() {
  const { data, isLoading } = useGetKycQuery();

  // Approve kyc
  const [approveKyc, res] = useApproveKycMutation();
  const { isLoading: isLoadingApproveKyc, error, isSuccess } = res;

  useMemo(() => {
    if (error) {
      toastError("Uh ho! Something went wrong");
    }
  }, [error]);

  useMemo(() => {
    if (isSuccess) {
      toastSuccess("Kyc Approved");
    }
  }, [isSuccess]);

  const handleApproveKyc = async (userId) => {
    await approveKyc(userId);
  };

  const [users, setUsers] = useState([]);
  const [imageSrcs, setImageSrcs] = useState({});
  const [clickedImage, setClickedImage] = useState(null);
  const [clickedId, setClickedId] = useState(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (data) {
      setUsers(data?.users);
    }
  }, [data]);

  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const pages = Math.ceil(users?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const sortedItems = users?.slice(start, end);
    // setUsers(sortedItems);
  }, [page]);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

   useEffect(() => {
     if (query.trim() != "") {
       const filteredUsers = users.filter((user) => {
         const { email, username } = user || {};
         const searchTerm = query.toLowerCase();
         return (
           (username && username.toLowerCase().includes(searchTerm)) ||
           (email && email.toLowerCase().includes(searchTerm))
         );
       });

       setUsers(filteredUsers);
     } else {
       setUsers(data?.users);
     }
   }, [query]);

  const sortedItems = useMemo(() => {
    if (items) {
      return [...items].sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }
  }, [sortDescriptor, items, users, imageSrcs]);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

   const handleChange = (e) => {
     const { value } = e.target;
     setQuery(value || "");

       if (value) {
         setPage(1);
       } else {
         setQuery("");
       }
   };

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4 max-w-7xl mx-auto w-full mt-4">
        <div className="flex justify-between gap-3 items-center">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<BsSearch />}
            onClear={() => onClear()}
            value={query}
            onChange={handleChange}
            size="lg"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users?.length} users
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    users?.length,
    handleChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items?.length, page, pages, hasSearchFilter]);

  return (
    <>
      {
        <ViewImageModal
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          clickedImage={clickedImage}
        />
      }
      <p className="text-3xl font-bold mb-4">Kyc Approval's</p>
      <Table
        aria-label="Kyc Approval"
        isHeaderSticky
        // bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px] max-w-7xl mx-auto w-full",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<Spinner color="primary" />}
          emptyContent={
            isLoading ? (
              <div className="h-92"></div>
            ) : (
              users?.length === 0 && (
                <div className="h-56 flex items-center justify-center">
                  No Record found
                </div>
              )
            )
          }
          items={sortedItems}
        >
          {users?.map((item) => {
            return (
              <TableRow
                key={item.id}
                columns={visibleColumns}
                row={item}
              >
                <TableCell>
                  <User description={item.email} name={item.username}>
                    {item.email}
                  </User>
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.id_card_expiry}</TableCell>
                <TableCell>
                  <div className="h-12 w-12 rounded-sm flex items-center justify-center cursor-pointer overflow-hidden">
                    <ImageFetch
                      imageName={item.kyc_image}
                      route="/users/kycImage"
                      radius="sm"
                      width={65}
                      onClick={(image) => {
                        setClickedImage(image);
                        onOpen();
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-12 w-12 rounded-sm flex items-center justify-center cursor-pointer overflow-hidden">
                    <ImageFetch
                      imageName={item.id_card_front}
                      route="/users/kycIdCardFront"
                      radius="sm"
                      width={65}
                      onClick={(image) => {
                        setClickedImage(image);
                        onOpen();
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="h-12 w-12 rounded-sm flex items-center justify-center cursor-pointer overflow-hidden">
                    <ImageFetch
                      imageName={item.id_card_back}
                      route="/users/kycIdCardBack"
                      radius="sm"
                      width={65}
                      onClick={(image) => {
                        setClickedImage(image);
                        onOpen();
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="relative flex items-center">
                    <Button
                      isLoading={clickedId === item.id && isLoadingApproveKyc}
                      startContent={<CheckIcon size={18} />}
                      color="success"
                      onClick={() => {
                        setClickedId(item.id);
                        handleApproveKyc(item.id);
                      }}
                      size="sm"
                      variant="bordered"
                      style={{width:"6rem"}}
                    >
                      Approve
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
          {/* {(item) =>
          !loading && (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )
        } */}
        </TableBody>
      </Table>
    </>
  );
}
