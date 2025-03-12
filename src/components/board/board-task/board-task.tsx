
function BoardTask() {
  return (
  <div className="grid gap-8">
    <div className=" flex items-center space-x-4 rounded-md border p-4 border-t-8 border-t-cyan-500">
           <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none ">
              TASK-0001 | Add a nav bar
            </p>
            <p className="text-sm text-muted-foreground">
              Assigned to Tarik
            </p>
          </div>
         </div>
          
         <div className=" flex items-center space-x-4 rounded-md border p-4 border-t-8 border-t-purple-500">
           <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none ">
              TASK-1345 | Suivi les fichiers medical
            </p>
            <p className="text-sm text-muted-foreground">
              Assigned to Unkown
            </p>
          </div>
         </div>
          
  </div>
  );
}

export default BoardTask;
