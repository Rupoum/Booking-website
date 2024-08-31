import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const page = ({ params }: any) => {
  // Sample user data based on the provided details
  const userDetails = {
    _id: "66d309b52f0359f55242299e",
    user_id: "66d1fbcb639a4e88bf62b5b7",
    status: "confirmed",
    cinema: "Cineopolis",
    movie_id: "Stree 2",
    screen_id: "66cd60372c0cc7ab17952c2a",
    seat_id: [
      { row: 6, column: 8, _id: "66d309b52f0359f55242299f" },
      { row: 6, column: 9, _id: "66d309b52f0359f5524229a0" },
    ],
  };

  // Sample invoice data
  const invoices = [
    {
      invoice: "INV001",
      status: "Paid",
      method: "Credit Card",
      amount: "$250.00",
    },
    // You can add more invoices here
  ];

  return (
    <div>
      <div>User Details for ID: {params.id}</div>
      <Table>
        <TableCaption>User and Invoice Details</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>User Id</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">User ID</TableCell>
            <TableCell>{userDetails.user_id}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">Movie ID</TableCell>
            <TableCell>{userDetails.movie_id}</TableCell>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger></AccordionTrigger>
                <AccordionContent>
                  {" "}
                  <TableRow>
                    <TableCell className="font-medium">Status</TableCell>
                    <TableCell>{userDetails.status}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Screen ID</TableCell>
                    <TableCell>{userDetails.screen_id}</TableCell>
                  </TableRow>{" "}
                  <TableRow>
                    <TableCell className="font-medium">Seats</TableCell>
                    <TableCell>
                      {userDetails.seat_id
                        .map((seat) => `Row ${seat.row}, Column ${seat.column}`)
                        .join(", ")}
                    </TableCell>
                  </TableRow>{" "}
                  <TableRow>
                    <TableCell className="font-medium">Invoice</TableCell>
                    <TableCell>
                      {invoices.map((invoice) => (
                        <div key={invoice.invoice}>
                          {invoice.invoice} - {invoice.status} -{" "}
                          {invoice.method} - {invoice.amount}
                        </div>
                      ))}
                    </TableCell>
                  </TableRow>{" "}
                  <TableRow>
                    <TableCell className="font-medium">Cinema</TableCell>
                    <TableCell>{userDetails.cinema}</TableCell>
                  </TableRow>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default page;
