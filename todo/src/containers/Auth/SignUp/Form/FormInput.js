
export const FormInput = (props) => (
   <div className="rowS">
     <label>{props.description}</label>
     <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.change}/>
   </div>
 );