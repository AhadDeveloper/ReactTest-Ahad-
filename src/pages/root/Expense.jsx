const ExpensePage = () => {
  return (
    <div className="mt-10 items-center flex flex-col gap-10 justify-center">
      <h1 className="text-2xl text-orange-500">Expense</h1>
      <form className="flex flex-col gap-9">
        <div className="flex gap-4">
          <label>Name: </label>
          <input type="text" />
        </div>
        <div className="flex gap-4">
          <label>Expenses: </label>
          <input type="text" />{" "}
        </div>
      </form>
    </div>
  );
};

export default ExpensePage;
