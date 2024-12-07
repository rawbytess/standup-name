export default function Header() {
  return (
    <header className={"mb-10 flex flex-col items-center"}>
      <div className={"flex items-center gap-5"}>
        <img src={"/favicon.ico"} />
        <h1>Random Name Selector</h1>
      </div>
      <h2 className={"text-xl mt-4"}>
        A lightweight, fast random name selector
      </h2>
    </header>
  );
}
