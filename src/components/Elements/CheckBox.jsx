function CheckBox({ text, checked, onChange }) {
  return (
    <div className="form-control">
      <label className="label cursor-pointer gap-1">
        <span className="label-text">{text}</span>
        <input
          type="checkbox"
          className="checkbox checkbox-success"
          checked={checked}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

export default CheckBox;
