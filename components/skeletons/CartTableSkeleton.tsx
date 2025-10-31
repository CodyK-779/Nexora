import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function CartTableSkeleton({ rowCount = 3 }: { rowCount?: number }) {
  return (
    <div className="flex flex-col w-full gap-4">
      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          {/* Table Header */}
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-20" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-24" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {Array.from({ length: rowCount }).map((_, index) => (
              <TableRow key={index}>
                {/* Product Column (Image + Name) */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-10 rounded-md" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </TableCell>

                {/* Price */}
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>

                {/* Quantity */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-4 w-6" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </TableCell>

                {/* Subtotal */}
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>

                {/* Remove Button */}
                <TableCell>
                  <Skeleton className="h-6 w-6 rounded-full" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
