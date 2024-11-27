const FunFacts = () => {
  const facts = [
    {
      title: 'Boost Team Collaboration',
      content: (
        <>
          <span className="text-[#C99A24] font-semibold">63% of Gen Z</span> said that they want to hear more timely,
          constructive performance feedback throughout
        </>
      ),
    },
  ];
  return (
    <div className="flex w-[350px] h-[500px] p-6 flex-col items-start gap-5 flex-shrink-0 rounded-md bg-gray-50 shadow-md">
      <h1 className="text-[18px] font-medium leading-[26px]">Fun Facts</h1>
      <div className="rounded-md bg-white shadow-md flex p-4 flex-col items-start gap-3 self-stretch">
        {facts.map((fact, index) => (
          <div key={index} className="flex flex-col items-start gap-3">
            <h2 className="text-lg font-medium leading-6">{fact.title}</h2>
            <p className="text-[14px] leading-[22px]">{fact.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FunFacts;
