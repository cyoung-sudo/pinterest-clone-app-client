import "./ImageForm.css"

export default function ImageForm({ setUrl, handleSubmit }) {
  return (
    <form id="imageForm" onSubmit={ handleSubmit }>
      <div className="imageForm-field">
        <label htmlFor="imageForm-url">Image URL</label>
        <input
          onChange={e => setUrl(e.target.value)}
          type="text" 
          id="imageForm-url"
          placeholder="image url"/>
      </div>

      <div className="imageForm-submit">
        <input type="submit" value="Submit"/>
      </div>
    </form>
  );
};