import {Button} from '@nextui-org/button'; 

export default function Index() {
  return (
    <div>
      <h1>Hello, world! ასდასდასდ ას დასდ ასდ 23ე სდფ სდფ სდფ სდფ</h1>
      <Button>Click me</Button>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">1</div>
        <div className="sm:col-span-1 sm:col-start-2">2</div>
        <div className="">3</div>
        <div className="sm:block hidden">empty 3</div>
        <div className="sm:col-span-1 sm:col-start-2">4</div>
        <div className="">5</div>
        <div className="hidden sm:block">empty</div>

        <div className="sm:col-span-2">
          <div className="w-full sm:w-1/2 mx-auto">New Content</div>
        </div>
      </div>
    </div>
  );
}
