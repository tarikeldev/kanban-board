import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./board-container.css";
function lol() {
  console.log("dddddd");
}
function BoardContainer() {
  return (
    <div className="grid grid-cols-4 m-5  card container gap-8">
      <Card className="col-start-1 shadow-md shadow-gray-400 ">
        <CardHeader>
          <CardTitle>To Do</CardTitle>
          <CardDescription className="grid gap-8">  
          {/* <div className=" flex items-center space-x-4 rounded-md border p-4">
           <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
         </div>
         <div className=" flex items-center space-x-4 rounded-md border p-4">
           <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">
              Push Notifications
            </p>
            <p className="text-sm text-muted-foreground">
              Send notifications to device.
            </p>
          </div>
         </div> */}
         </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      <Card className="col-start-2 shadow-md shadow-gray-400 ">
        <CardHeader>
          <CardTitle>In Progress</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      <Card className="col-start-3 shadow-md shadow-gray-400 ">
        <CardHeader>
          <CardTitle>Review</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
      <Card className="col-start-4 shadow-md shadow-gray-400 " onDrag={lol}>
        <CardHeader>
          <CardTitle>Resolved</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default BoardContainer;
