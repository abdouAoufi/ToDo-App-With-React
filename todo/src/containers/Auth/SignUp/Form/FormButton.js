export const FormButton = (props) => (
   <div id="button" className="rowS">
     <button disabled={props.disabled} onClick={props.click}>{props.title}</button>
   </div>
 );