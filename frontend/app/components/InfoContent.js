const infos = [
  {
    Category: 0,
    "T-Number": "1.0 - 3.5",
    "Intensity Range (Knots)": "25 - 55",
    "Pressure Range (mb)": "994 - 1009",
    Description:
      "Category 0 cyclones are weak and typically result in minimal damage. They may bring light to moderate rain and some wind, but generally pose little threat to life and property.",
    Management:
      "Disaster management for Category 0 cyclones involves monitoring weather updates, securing loose objects, and ensuring basic emergency supplies are on hand. Coastal residents may be advised to stay indoors until the storm passes.",
  },
  {
    Category: 1,
    "T-Number": "4.0 - 4.5",
    "Intensity Range (Knots)": "65 - 77",
    "Pressure Range (mb)": "979 - 987",
    Description:
      "Category 1 cyclones are relatively weak but can still cause damage. They may bring moderate wind and rain, potentially causing localized flooding and minor structural damage.",
    Management:
      "Disaster management for Category 1 cyclones involves securing outdoor items, reinforcing windows and doors, and stocking up on essential supplies. Residents in low-lying areas may be advised to evacuate to higher ground.",
  },
  {
    Category: 2,
    "T-Number": "5.0",
    "Intensity Range (Knots)": "90",
    "Pressure Range (mb)": "970",
    Description:
      "Category 2 cyclones are moderately strong and can cause significant damage. They may bring strong winds, heavy rain, and storm surges, resulting in flooding, power outages, and damage to infrastructure.",
    Management:
      "Disaster management for Category 2 cyclones involves evacuating vulnerable areas, securing property, and preparing for prolonged power outages and potential disruption to essential services. Residents may be advised to seek shelter in designated evacuation centers.",
  },
  {
    Category: 3,
    "T-Number": "5.5",
    "Intensity Range (Knots)": "102",
    "Pressure Range (mb)": "960",
    Description:
      "Category 3 cyclones are considered major hurricanes and can cause extensive damage. They bring strong winds, heavy rain, and dangerous storm surges, leading to widespread flooding, structural damage, and disruption of essential services.",
    Management:
      "Disaster management for Category 3 cyclones involves mandatory evacuation of coastal and low-lying areas, reinforcement of critical infrastructure, and activation of emergency response plans. Residents should evacuate to safe shelters or inland locations.",
  },
  {
    Category: 4,
    "T-Number": "6.0 - 6.5",
    "Intensity Range (Knots)": "115 - 127",
    "Pressure Range (mb)": "935 - 948",
    Description:
      "Category 4 cyclones are extremely dangerous and can cause catastrophic damage. They bring extremely strong winds, torrential rain, and devastating storm surges, resulting in widespread destruction of infrastructure, severe flooding, and significant loss of life.",
    Management:
      "Disaster management for Category 4 cyclones involves mandatory evacuation of coastal and low-lying areas, reinforcement of critical infrastructure, and implementation of emergency response measures. Residents should evacuate to designated shelters or safe inland locations well in advance of the storm.",
  },
  {
    Category: 5,
    "T-Number": "7.0 - 8.0",
    "Intensity Range (Knots)": "140 - 170",
    "Pressure Range (mb)": "890 - 921",
    Description:
      "Category 5 cyclones are the most intense and destructive hurricanes. They bring extremely powerful winds, torrential rainfall, and catastrophic storm surges, causing widespread devastation, complete destruction of infrastructure, and loss of life.",
    Management:
      "Disaster management for Category 5 cyclones involves immediate evacuation of all coastal and low-lying areas, activation of emergency response plans, and deployment of resources for search, rescue, and recovery operations. Residents must evacuate to designated shelters or safe inland locations without delay to ensure their safety.",
  },
];

export default function InfoContent() {
  return (
    <div className="w-full flex flex-col bg-black p-4 overflow-hidden">
      <div>
        <div className="sticky top-[1rem] flex flex-row mb-4 bg-black">
          <div className="p-2 rounded-lg border border-white border-opacity-40 mr-2 w-32 flex flex-col justify-center bg-white text-black">
            Category
          </div>
          <div className="p-2 rounded-lg border border-white border-opacity-40 mr-2 w-32 flex flex-col justify-center bg-white text-black">
            T-Number
          </div>
          <div className="p-2 rounded-lg border border-white border-opacity-40 mr-2 w-32 flex flex-col justify-center bg-white text-black">
            Intensity Range (Knots)
          </div>
          <div className="p-2 rounded-lg border border-white border-opacity-40 mr-2 w-36 flex flex-col justify-center bg-white text-black">
            Pressure Range (mb)
          </div>
          <div className="p-2 rounded-lg border border-white border-opacity-40 mr-2 w-1/2 bg-white text-black flex flex-col justify-center">
            Description
          </div>
          <div className="p-2 rounded-lg border border-white border-opacity-40 w-1/2 bg-white text-black flex flex-col justify-center">
            Management
          </div>
        </div>
        <div className="w-full flex flex-col h-[22rem] overflow-scroll border-b border-white border-opacity-40 pb-2 pt-4 border-t">
          {infos.map((info) => (
            <div className="flex flex-row w-full mb-2 bg-black">
              <div className="p-2 rounded-lg border border-white border-opacity-40 mr-2 w-32 flex flex-col justify-center font-bold">
                {info["Category"]}
              </div>
              <div className="p-2 rounded-lg border border-white border-opacity-40 mr-2 w-32 flex flex-col justify-center">
                {info["T-Number"]}
              </div>
              <div className="p-2 rounded-lg border border-white border-opacity-40 mr-2 w-32 flex flex-col justify-center">
                {info["Intensity Range (Knots)"]}
              </div>
              <div className="p-2 rounded-lg border border-white border-opacity-40 mr-2 w-36 flex flex-col justify-center">
                {info["Pressure Range (mb)"]}
              </div>
              <div className="p-2 rounded-lg border border-white border-opacity-40 mr-2 w-1/2">
                {info["Description"]}
              </div>
              <div className="p-2 rounded-lg border border-white border-opacity-40 w-1/2">
                {info["Management"]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
