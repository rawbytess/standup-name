import { useEffect, useState } from "react";
import { useTextScramble } from "@skits/react-text-scramble";
import "./App.css";
import { Button } from "@/components/ui/button.tsx";
import { useQueryState } from "nuqs";
import { Textarea } from "@/components/ui/textarea.tsx";
import { Label } from "@/components/ui/label.tsx";
import Footer from "@/components/Footer.tsx";
import { Trash2 } from "lucide-react";
import Header from "@/components/Header.tsx";

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
    if (names?.length === 0) return;
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
        <Header />
        <div
          className={"flex flex-wrap flex-col items-center gap-1 mb-10 w-full"}
        >
          <div className="relative w-full max-w-md mx-auto mt-4">
            <Label className={"text-2xl text-left"}>
              Enter comma separated list of names:
            </Label>
            <Textarea
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={names}
              onChange={(e) => setNames(e.target.value)}
              placeholder="Megatron, Optimus, Bumblebee, Starscream, Soundwave"
              className={
                "h-[8em] ring-2 ring-gray-600 focus-visible:ring-2 text-lg tracking-wide font-light mt-5"
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
          {nameList.length > 0 && (
            <div>
              <ul className={"mb-10"}>
                {remainingList.map((name) => (
                  <li key={name}>
                    <Button
                      variant={"default"}
                      disabled
                      className={
                        "min-w-[20em] mb-2 bg-cyan-600 text-white disabled:opacity-100"
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
                        className={
                          "min-w-[20em] line-through text-gray-800 bg-gray-200"
                        }
                      >
                        {name}
                      </Button>
                    </li>
                  ))}
              </ul>
            </div>
          )}
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

      <Footer />
    </>
  );
}

export default App;
