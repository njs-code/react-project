//build the table header html
function TableHeader() {
    return (
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Job</th>
          <th>Remove</th>
        </tr>
      </thead>
    );
}

//build table body
function TableBody(props) {
    //map each character row to name/job, index as key
    const rows = props.characterData.map((row, index) => {
        return (
        <tr key={index}>
            <td>{row._id} </td>
            <td>{row.name}</td>
            <td>{row.job}</td>
            <td>
                <button onClick={() => props.removeCharacter(row)}>
                Delete
                </button>
            </td>
        </tr>
        );
        });
    return (
        <tbody>
          {rows}
         </tbody>
     );
}

//functional table component
function Table(props) {
      return (
        <table>
          <TableHeader />
          <TableBody characterData={props.characterData} 
          removeCharacter={props.removeCharacter}
          />
        </table>
      );
}

export default Table;