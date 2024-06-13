import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    id: "01",
    name: "Faheem Malik",
    email: "faheemmalik88@gmail.com",
    status: "Active",
  },
  {
    id: "02",
    name: "Muhammad Hateem",
    email: "hateembro@gmail.com",
    status: "Active",
  },
  {
    id: "03",
    name: "Zahid Yousaf",
    email: "zahidnigga@gmail.com",
    status: "Disabled",
  },
  {
    id: "04",
    name: "Sibghatullah",
    email: "sibghat@gmail.com",
    status: "Active",
  },
  {
    id: "05",
    name: "Hamza Ali",
    email: "homoali@gmail.com",
    status: "Active",
  },
  {
    id: "06",
    name: "Jon Snow",
    email: "snow@gmail.com",
    status: "Active",
  },
  {
    id: "07",
    name: "Arya Stark",
    email: "homoali@gmail.com",
    status: "Active",
  },
];

export function UserTable() {
  return (
    <Table>
      <TableCaption>A list of registered users on paycust.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Sno</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell>{invoice.name}</TableCell>
            <TableCell>{invoice.email}</TableCell>
            <TableCell className="text-right">{invoice.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">2,500</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
