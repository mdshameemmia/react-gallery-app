import Input from "./common/input.component";

const ImageCard = ({ url, onEvent }) =>  (
    <div >
      <Input type="checkbox" className="input form-check-input" onEvent={(e)=>onEvent(e)} />
      <img src={url} alt="Image"/>
      <div className="image-overlay"></div>
    </div>
);

export default ImageCard;
