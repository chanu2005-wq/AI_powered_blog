import { useRef } from "react";
import { useAppContext } from "../context/app-context";
import { assets } from "../assets/assets/assets.js";

const Header = () => {
  const { setInput, input } = useAppContext();
  const inputRef = useRef(null);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setInput(inputRef.current.value.trim());
  };

  const clearSearch = () => {
    setInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="relative mx-8 sm:mx-16 xl:mx-24">
      <div className="mt-20 mb-8 text-center">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5 mb-4 border border-primary/30 bg-lavender-light rounded-full text-sm text-primary">
          <p>New: AI feature integrated</p>
          <img src={assets.star_icon} className="w-2.5" alt="" />
        </div>

        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-text">
          Your Own <span className="text-primary">Blogging</span>
          <br /> Platform
        </h1>

        <p className="my-6 sm:my-8 max-w-2xl mx-auto max-sm:text-xs text-muted">
          This is your space to think out loud, to share what matters, and to
          write without filters. Whether it's one word or a thousand, your story
          starts right here.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-border bg-white rounded overflow-hidden"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for blogs"
            required
            className="w-full pl-4 outline-none"
          />

          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:bg-hover transition-all cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>

      <div className="text-center">
        {input.trim() !== "" && (
          <button
            type="button"
            onClick={clearSearch}
            className="border border-border font-light text-xs py-1 px-3 rounded-sm cursor-pointer"
          >
            Clear Search
          </button>
        )}
      </div>

      <img
        src={assets.gradentBackground}
        alt=""
        className="absolute -top-50 -z-10 opacity-50"
      />
    </div>
  );
};

export default Header;
