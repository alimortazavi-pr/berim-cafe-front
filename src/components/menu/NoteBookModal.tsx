import { FC } from "react";
import { Modal } from "@nextui-org/react";

//Types
import { noteBookModalProps } from "@/common/types/menu.type";

//Redux
import { useAppSelector } from "@/store/hooks";
import { noteItemsSelector } from "@/store/menu/selectors";

//Components
import SingleItemNoteBook from "./SingleItemNoteBook";

//Tools
import { useMediaQuery } from "react-responsive";

const NoteBookModal: FC<noteBookModalProps> = ({
  bindings,
  setVisible,
  cafe,
}) => {
  //Redux
  const noteBookItems = useAppSelector(noteItemsSelector);

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
      className="!rounded-none lg:!rounded-3xl"
    >
      <Modal.Body className="!px-3">
        <div className="grid grid-cols-12 gap-2 md:gap-3 mb-5 pt-5">
          {noteBookItems?.map((item) => (
            <SingleItemNoteBook key={item._id} cafe={cafe} item={item} />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default NoteBookModal;
