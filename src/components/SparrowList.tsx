import moment from "moment";
import {
  Button,
  Comment,
  Dimmer,
  Form,
  Icon,
  Image,
  Loader,
  Segment,
} from "semantic-ui-react";
import { timeCalculation } from "../lib/calendar";
import { DocDatas } from "../Types/DocumentInteface";

type DataProps = {
  sparrows: DocDatas["sparrow"][];
};

function SparrowList({ sparrows }: DataProps) {
  return (
    <div
      style={{
        minHeight: "380px",
        maxHeight: "580px",
        overflowY: "auto",
      }}
    >
      {sparrows &&
        sparrows.map((sparrow: DocDatas["sparrow"]) => (
          <SparrowItem sparrow={sparrow} key={sparrow.id} />
        ))}
    </div>
  );
}

function SparrowItem({ sparrow }: DocDatas) {
  const { text } = sparrow;
  return (
    <Comment.Group>
      <Comment>
        <Comment.Avatar
          as="a"
          src={`${sparrow.userPhoto && sparrow.userPhoto}`}
        />
        <Comment.Content>
          <Comment.Author>{sparrow.username}</Comment.Author>
          <Comment.Metadata>
            <div>{timeCalculation(sparrow.createAt)}</div>
          </Comment.Metadata>
          <Comment.Text>{sparrow.text}</Comment.Text>
          <Image
            src={`${sparrow.url && sparrow.url}`}
            size="massive"
            bordered
            alt="url"
          />
        </Comment.Content>
      </Comment>
    </Comment.Group>
  );
}

export default SparrowList;
