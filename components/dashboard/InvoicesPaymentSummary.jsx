import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDownIcon } from "lucide-react";

const PaymentSummary = ({ summary }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <Card className="col-span-1 md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Outstanding Receivables
          </CardTitle>
          <ArrowDownIcon className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">CFA {summary.totalOutstanding}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-col space-y-1.5 pb-2">
          <CardTitle className="text-sm font-medium">Due Today</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-500"> CFA {summary.dueToday}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-col space-y-1.5 pb-2">
          <CardTitle className="text-sm font-medium">Due Within 30 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">CFA {summary.dueWithin30Days}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-col space-y-1.5 pb-2">
          <CardTitle className="text-sm font-medium">Average Days for Getting Paid</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.averageDaysForPayment} Days</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSummary;