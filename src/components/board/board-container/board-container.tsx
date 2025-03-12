import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import "./board-container.css";
import BoardTask from "../board-task/board-task";
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
 <BoardTask/>
 
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
