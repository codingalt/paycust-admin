import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  cn,
} from "@nextui-org/react";
import { MdEditSquare } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import css from "./SubCategories.module.scss";
import { HiDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const ActionDropdown = ({ item, openModal, setSelectedItem }) => {
  const navigate = useNavigate();
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  const handleSelection = (key) => {
    switch (key) {
      case "edit":
        navigate(`/admin/edit/subCategory/${item.id}`);
        break;
      case "delete":
        setSelectedItem(item);
        openModal();
        break;
      default:
        break;
    }
  };

  return (
    <Dropdown placement="bottom-end" backdrop="blur">
      <DropdownTrigger>
        <div className={css.menuIcon}>
          <HiDotsVertical />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(key) => handleSelection(key)}
        selectionMode="single"
        variant="faded"
        aria-label="Dropdown menu for subcategory"
      >
        <DropdownItem
          key="edit"
          showDivider
          description="Allows you to edit the item"
          startContent={<MdEditSquare className={iconClasses} />}
        >
          Edit file
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          description="Permanently delete the item"
          startContent={
            <AiFillDelete className={cn(iconClasses, "text-danger")} />
          }
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ActionDropdown;
