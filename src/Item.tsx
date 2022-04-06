import { useParams } from "react-router-dom";

function Item() {
    const { id } = useParams();
    return (
        <div>
            <h2>Item ID: { id } </h2>
        </div>
    );
  }

  export default Item;