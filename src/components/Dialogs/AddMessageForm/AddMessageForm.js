import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../Common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";

const maxLength50 = maxLengthCreator(50);

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}
                       validate={[required, maxLength50]}
                       name={"newMessageBody"}
                       placeholder="Enter your message"/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
}

export default reduxForm({ form: "dialogAddMessageForm" }) (AddMessageForm)      // Филды необходимо оборачивать функцией высшего порядка РедаксФорм или они не будут работать. Форма берется из библиотеки Редакс форм.
