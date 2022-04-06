import './NewItem.css';

function NewItem() {
    return (
        <div>
            <h2>NewItem</h2>

            <form>
                <div className="container">
                    <div className="row">
                        <div className="col-25">
                            <label>Id:</label>
                        </div>
                        <div className="col-75">
                            <input type="number" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>Task Name:</label>
                        </div>
                        <div className="col-75">
                            <input type="text"  />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-25">
                            <label>User:</label>
                        </div>
                        <div className="col-75">
                            <input type="text" />
                        </div>
                    </div>    
                    <div className="row">
                        <div className="col-25">
                            <label>Completed:</label>
                        </div>
                        <div className="col-75">
                            <input type="checkbox"  />
                        </div>   
                    </div>
                    <div className="row">
                        <input type="submit" />
                    </div> 
                </div>
            </form>
        </div>
    );
  }

  export default NewItem;