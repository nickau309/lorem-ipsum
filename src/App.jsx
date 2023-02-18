import React, { useId, useState } from "react";
import data from "./data";

export default function App() {
  const [count, setCount] = useState(1);
  const [order, setOrder] = useState([]);
  const id = useId();

  const handleChange = (e) => {
    if (
      e.target.validity.valid &&
      e.target.value !== "" &&
      e.target.value !== "-"
    ) {
      setCount(parseInt(e.target.value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = new Array(data.length).fill(null).map((_, i) => i);
    for (let i = order.length - 1; i > 0; --i) {
      let j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    setOrder(order.slice(0, count));
  };

  return (
    <main className="flex min-h-screen justify-center bg-slate-100 px-4 py-12 text-sky-900 md:py-20">
      <section className="flex w-full max-w-2xl flex-col gap-6 text-center md:gap-8">
        <h3 className="text-xl font-bold tracking-wider md:text-3xl">
          Tired of Boring Lorem Ipsum?
        </h3>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4"
        >
          <div className="flex items-center gap-2 text-lg md:text-xl">
            <label htmlFor={id} className="tracking-wider">
              Paragraphs:
            </label>
            <input
              type="number"
              id={id}
              min="1"
              max={data.length}
              value={count}
              onChange={handleChange}
              className="rounded py-1 px-2 outline-0 focus:ring-2"
            />
          </div>
          <button
            type="submit"
            className="transition-color rounded-full bg-sky-300 py-2 px-3.5 text-sm uppercase tracking-[1px] shadow shadow-black/20 outline-0 duration-200 hover:bg-sky-400 focus:ring-2 focus:ring-offset-1 focus:ring-offset-slate-100"
          >
            Generate
          </button>
        </form>
        <article className="flex flex-col gap-4 text-sm text-slate-500 md:gap-5 md:text-base">
          {order.map((item, index) => (
            <p key={index}>{data[item]}</p>
          ))}
        </article>
      </section>
    </main>
  );
}
