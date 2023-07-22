import { FC } from "react";
import { Modal } from "@nextui-org/react";
import Image from "next/image";
import dynamic from "next/dynamic";

//Types
import { cafeInformationModalProps } from "@/common/types/cafe.type";

//Tools
import cafeLogoImg from "@/assets/images/cafe-logo.png";
import convertToPersian from "num-to-persian";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
const NeshanMap: any = dynamic(() => import("react-neshan-map-leaflet"), {
  ssr: false,
});
import { useMediaQuery } from "react-responsive";

const CafeInformationModal: FC<cafeInformationModalProps> = ({
  bindings,
  setVisible,
  cafe,
}) => {
  //Responsive
  const isLg = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  return (
    <Modal
      scroll
      fullScreen={isLg ? false : true}
      closeButton
      {...bindings}
      className="bg-white !rounded-none lg:!rounded-3xl"
    >
      <Modal.Body className="!px-3">
        <div className="flex flex-col items-center">
          <div className="relative w-[135px] h-[135px] mb-4 rounded-full border border-violet-300">
            {cafe.logo ? (
              <Image
                src={`https://api-panel.berimcafe.org/${cafe.logo}`}
                alt=""
                fill
                className="rounded-full object-cover object-center"
              />
            ) : (
              <Image
                src={cafeLogoImg}
                alt=""
                fill
                className="rounded-full object-cover object-center"
              />
            )}
          </div>
          <h3 className="text-3xl font-bold text-zinc-800 mb-3">{cafe.name}</h3>
          <p className="text-zinc-800 font-medium mb-1">
            {cafe.province} ، {cafe.city}
            {cafe.address ? " ، " + cafe.address : ""}
          </p>
          <div className="text-zinc-800 mb-1 font-medium">
            {cafe.workingHours.map((workingHour, i) => (
              <span key={i}>
                از ساعت {convertToPersian(workingHour.from)} تا ساعت{" "}
                {convertToPersian(workingHour.to)}
              </span>
            ))}
          </div>
          <div className="text-zinc-800 mb-3 font-medium">
            {cafe.phones.map((phone, i) => (
              <span key={i}>{convertToPersian(phone)}</span>
            ))}
          </div>
          {cafe.images && cafe.images.length > 0 ? (
            <div className="w-full mb-3">
              <Swiper
                pagination={true}
                modules={[Pagination]}
                className="h-[200px] md:h-[400px] w-full"
              >
                {cafe.images?.map((image, i) => (
                  <SwiperSlide key={i} className="w-full h-full">
                    <div className="relative rounded-2xl w-full h-full">
                      <Image
                        src={`https://api-panel.berimcafe.org/${image}`}
                        alt=""
                        fill
                        className="rounded-3xl object-cover object-center"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : null}

          <p className="mb-3 text-zinc-800 text-right">{cafe.about}</p>
          {cafe.location && cafe.location.length > 0 ? (
            <div className="w-full h-80 md:h-96">
              <NeshanMap
                options={{
                  key: "web.9fbee7961b844ccb881385a28814ac7b",
                  center: cafe.location,
                  width: "100%",
                  zoom: 13,
                  maptype: "standard-day",
                }}
                onInit={(L: any, myMap: any) => {
                  let marker = L.marker(cafe.location)
                    .addTo(myMap)
                    .bindPopup("لوکیشن دقیق کافه");
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "17px",
                }}
              />
            </div>
          ) : null}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CafeInformationModal;
