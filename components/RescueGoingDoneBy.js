const RescueGoingDoneBy = ({ data }) => {
  return (
    <ul>
      {data.rescue.going && !data.rescue.done && (
        <li>going by: {data.rescue.by}</li>
      )}
      {data.rescue.done && <li>done by: {data.rescue.by}</li>}
      <style jsx>
        {`
          ul {
            display: flex;
            flex-wrap: wrap;
            list-style: none;
            padding: 0;
            margin: 0;
          }
          ul > li {
            display: flex;
            align-items: center;
            height: 0;
            line-height: 0;
            font-size: 12px;
            color: #666;
            border-radius: 10px;
            background: rgba(40, 40, 40, 0.8);
            padding: 10px;
            margin-right: 5px;
            margin-bottom: 5px;
          }
        `}
      </style>
    </ul>
  );
};

export default RescueGoingDoneBy;
