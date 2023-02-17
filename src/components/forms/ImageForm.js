import "./ImageForm.css"

export default function ImageForm({ setUrl, handleSubmit }) {
  return (
    <form id="imageForm" onSubmit={ handleSubmit }>
      <div className="imageForm-field">
        <input
          onChange={e => setUrl(e.target.value)}
          type="text" 
          placeholder="image url"/>
      </div>

      <div className="imageForm-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};