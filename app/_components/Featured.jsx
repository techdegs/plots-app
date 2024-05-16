
import { property } from "@/data/dummyData";
import SingleProductCard from "./SingleProductCard";

const Featured = () => {
  return (
    <div className="pt-10 pb-16 px-12">
      <div className="text-center">
        <h1 className="mx-auto p-2 text-primary/80 text-sm bg-cyan-100 rounded-full w-32 capitalize text-center">featured</h1>
        <h1 className="font-bold text-xl capitalize">explore featured latest properties</h1>
      </div>
      <div className="flex flex-wrap gap-6 mt-8">
        {property.slice(0, 3).map((featured) => (
          <SingleProductCard key={featured.id} {...featured} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
