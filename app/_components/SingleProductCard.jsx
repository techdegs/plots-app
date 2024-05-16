
import CardHoverIcons from "./CardHoverIcons";
import CardLabels from "./CardLabels";
import Link from "next/link";
import { ArrowRight, Bath, Bed, LandPlot, MapPin } from "lucide-react";

const SingleProductCard = ({
  name,
  location,
  price,
  distance,
  purpose,
  number_of_beds,
  number_of_bathrooms,
  dimensions,
  image,
  basis,
}) => {
  return (
    <div
      className={`flex-1 ${
        basis ? basis : "basis-[18rem]"
      } shadow-light dark:border-card-dark border rounded-lg overflow-hidden relative group`}
    >
      <div className="group !opacity-100 overflow-hidden relative">
        <Link href="/" className="!opacity-100">
          <img
            src={image}
            alt={name}
            className="w-full  h-fit md:h-[250px] object-cover group-hover:scale-125 transition-all"
          />
        </Link>
        <CardHoverIcons />
        <div className="absolute bottom-0 left-0 w-full px-2 py-2 transition-transform bg-gradient-to-t from-black/80 sm:translate-y-10 group-hover:translate-y-0 to-transparent">
          <div className="text-white flex items-center gap-x-2">
            <MapPin />
            <p>{location}</p>
          </div>
        </div>
      </div>
      <CardLabels purpose={purpose} distance={distance} />
      <div className="p-3">
        <Link href="/" className="group-hover:text-primary transition-a">
          <h1 className="text-lg font-bold capitalize">{name}</h1>
        </Link>
        <div className="flex justify-between mt-3">
          <div className="flex items-center gap-x-2">
            <div className="bg-cyan-100 rounded-full text-primary">
              <Bed className="w-5 h-5 p-1" />
            </div>
            <p className="text-sm">{number_of_beds} Beds</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="bg-cyan-100 rounded-full text-primary">
              <Bath className="w-5 h-5 p-1" />
            </div>
            <p className="text-sm">{number_of_bathrooms} Bathrooms</p>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="bg-cyan-100 rounded-full text-primary">
              <LandPlot className="w-5 h-5 p-1" />
            </div>
            <p className="text-sm">{dimensions}</p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-primary">GHS. {price}</h1>
          <Link href={'/'} className="btn btn-secondary animate-pulse flex items-center hover:underline">View Details <ArrowRight className="w-5 h-5" /> </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
