
function CheckBox({ text, checked, onChange }) {

    return (
        <label className="label cursor-pointer gap-1">
            <input
                type="checkbox"
                className="checkbox"
                checked={checked}
                onChange={onChange}
            />
            <span className="label-text">{text}</span>
        </label>
    )
}

export default CheckBox