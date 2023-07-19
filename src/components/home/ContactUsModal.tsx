import { FC } from "react";
import { Modal } from "@nextui-org/react";
import Image from "next/image";

//Types
import { nextUIModalProps } from "@/common/types/layouts.type";

//Tools
import { useMediaQuery } from "react-responsive";

const ContactUsModal: FC<nextUIModalProps> = ({
  bindings,
  setVisible,
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
        <div>
          <p>
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
            استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
            ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز،
            و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای
            زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و
            متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان
            رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد
            کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه
            راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل
            حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
            طراحی اساسا مورد استفاده قرار گیرد.
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ContactUsModal;
