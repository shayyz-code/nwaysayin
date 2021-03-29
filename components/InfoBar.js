const InfoBar = props => {
  return (
    <div id="infobar">
      <div id="total">Total: {props.data.length}</div>
      {props.showOnlyConfirmed && (
        <div id="confirmed">
          Confirmed: {props.data.filter(item => item.confirmed === true).length}
        </div>
      )}
      {props.showOnlyConfirmed && (
        <div id="checkboxContainer">
          <input
            type="checkbox"
            name="showOnlyConfirmed"
            id="checkbox"
            onChange={e => props.showOnlyConfirmed(e.target.checked)}
          />
          <label htmlFor="checkbox" id="checkboxLabel">
            Show Only Confirmed
          </label>
        </div>
      )}
      <style jsx>
        {`
          #infobar {
            position: fixed;
            top: 45px;
            left: 0;
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            justify-content: space-evenly;
            align-items: center;
            font-size: 12px;
            color: #fff;
            background: #000;
          }

          #checkboxContainer {
            display: flex;
            align-items: center;
          }

          #checkbox,
          #checkboxLabel {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default InfoBar;
