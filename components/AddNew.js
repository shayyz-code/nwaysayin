import Link from 'next/link';

const AddNew = ({ col }) => {
  return (
    <div
      className="container"
      style={{
        display: !col ? 'none' : 'flex',
      }}
    >
      <div className="addLinksContainer">
        <div className="title">Add New</div>
        <Link href="/add/loss">
          <a className="addLinks" id="addLoss">
            Loss
          </a>
        </Link>
        <Link href="/add/death">
          <a className="addLinks" id="addDeath">
            Death
          </a>
        </Link>
        <Link href="/add/rescue">
          <a className="addLinks" id="addRescue">
            Rescue
          </a>
        </Link>
        <Link href="/add/other">
          <a className="addLinks" id="addOther">
            Other
          </a>
        </Link>
      </div>
      <style jsx>
        {`
          .container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 100%;
            height: 100%;
            backdrop-filter: blur(5px);
            background: rgba(40, 40, 40, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2;
          }

          .addLinksContainer {
            display: flex;
            flex-wrap: wrap;
            width: 162px;
            height: 162px;
          }

          .title {
            width: 156px;
            height: 40px;
            text-align: center;
            line-height: 40px;
            font-size: 12px;
            color: #fff;
            border-radius: 10px;
            background: rgba(180, 0, 0, 0.6);
            margin: 3px;
          }

          .addLinks {
            width: 75px;
            height: 75px;
            text-align: center;
            text-decoration: none;
            font-size: 12px;
            color: #fff;
            line-height: 75px;
            transition: 0.1s;
            border-radius: 10px;
            background: rgba(50, 50, 50, 0.6);
            margin: 3px;
          }

          .addLinks:hover {
            background: rgba(60, 60, 60, 0.6);
          }
        `}
      </style>
    </div>
  );
};

export default AddNew;
