import { useEffect, useState } from "react";
import { useTextScramble } from "@skits/react-text-scramble";
import "./App.css";
import { Button } from "@/components/ui/button.tsx";
import { useQueryState } from "nuqs";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import Footer from "@/components/Footer.tsx";
import { Trash2 } from "lucide-react";

function App() {
  const [names, setNames] = useQueryState("names", { defaultValue: "" });
  const [nameList, setNameList] = useState<string[]>([]);
  const [remainingList, setRemainingList] = useState<string[]>([]);
  const [selectedName, setSelectedName] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const { state, reveal } = useTextScramble(selectedName, {
    speed: 100,
  });

  useEffect(() => {
    const nameList = names
      .trim()
      .split(",")
      .map((name) => name.trim());
    setNames(nameList.join(", "));
    setNameList(nameList);
    setRemainingList(nameList);
  }, [names]);

  useEffect(() => {
    reveal(200, 100, "typewriter");
  }, [reveal, selectedName]);

  const selectRandomName = () => {
    setDisableButton(true);
    if (remainingList.length === 0) return;

    const randomIndex = Math.floor(Math.random() * remainingList.length);
    const name = remainingList[randomIndex];

    setSelectedName(name);

    setTimeout(() => {
      setRemainingList((prevState) =>
        prevState.filter((_, index) => index !== randomIndex),
      );
      // setAttendedNames(names.filter((_, index) => index !== randomIndex));
      setDisableButton(false);
    }, 2000);
  };

  const resetList = () => {
    setNames("");
    setSelectedName("");
    setNameList([]);
  };

  return (
    <>
      <div className={"flex flex-col flex-wrap items-center mb-40 mt-10"}>
        <div className={"mb-10 flex flex-col items-center"}>
          <h1>Standup Name Selector</h1>
          <h2 className={"text-xl"}>
            A lightweight, fast random name selector
          </h2>
        </div>

        <div
          className={"flex flex-wrap flex-col items-center gap-1 mb-10 w-full"}
        >
          <Label className={"text-lg"}>
            Enter comma separated list of names:
          </Label>
          <div className="relative w-full max-w-md mx-auto mt-4">
            <Textarea
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={names}
              onChange={(e) => setNames(e.target.value)}
              placeholder="Megatron, Optimus, Bumblebee, Starscream, Soundwave"
              className={
                "h-[8em] ring-2 ring-black focus-visible:ring-2 text-lg tracking-wide font-light"
              }
            />
            <Button
              onClick={resetList}
              variant={"outline"}
              className="absolute bottom-2 right-2 text-xs w-10"
            >
              <Trash2 />
            </Button>
          </div>
        </div>

        <div className={"p-5 flex flex-wrap gap-10 flex-row text-center"}>
          <div>
            <ul className={"mb-10"}>
              {remainingList.map((name) => (
                <li key={name}>
                  <Button
                    variant={"default"}
                    disabled
                    className={
                      "w-full mb-2 bg-gray-800 text-white disabled:opacity-100"
                    }
                  >
                    {name}
                  </Button>
                </li>
              ))}
            </ul>
            <ul>
              {nameList
                .filter((x) => !remainingList.includes(x))
                .map((name) => (
                  <li key={name} className={"mb-2"}>
                    <Button
                      disabled
                      className={"w-full line-through text-white bg-gray-800"}
                    >
                      {name}
                    </Button>
                  </li>
                ))}
            </ul>
          </div>
          <Button
            onClick={selectRandomName}
            disabled={remainingList.length === 0 || disableButton}
            className={
              "rounded-full w-[10em] h-[10em] text-wrap font-bold bg-purple-500 ring-4 ring-purple-600 " +
              "hover:bg-purple-800 hover:ring-0 text-white"
            }
          >
            {selectedName ? (
              <h2 className={"font-bold text-lg"}>{state.output}</h2>
            ) : (
              <>
                <p className={""}>Press Me</p>
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="fixed inset-x-0 bottom-0 bg-black">
        <Footer />
      </div>
    </>
  );
}

export default App;
