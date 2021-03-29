import { useRouter } from 'next/router';
import Head from 'next/head';

import { useState, useCallback, useContext } from 'react';
import { firestore } from '../firebase/firebase';
import Services from '../firebase/services';
import RescueTagsInput from './RescueTagsInput';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronCircleLeft,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from './AuthProvider';

const AddRescue = () => {
  const router = useRouter();
  const currentUser = useContext(AuthContext);

  const defaultData = {
    addedBy: {
      username: '',
      verified: false,
    },
    location: '',
    tags: [],
    content: '',
  };

  const [formData, setFormData] = useState(defaultData);

  const handleOnSubmit = e => {
    e.preventDefault();
    const addedTime = new Date().toString();
    Services.add({
      ...formData,
      addedBy: currentUser
        ? { username: currentUser.displayName, verified: true }
        : formData.addedBy,
      case: 'rescue',
      comments: '',
      rescue: {
        done: false,
        going: false,
        goingTime: '',
        doneTime: '',
        by: '',
      },
      addedTime,
    })
      .then(() => {
        setFormData(defaultData);
        router.push('/rescue');
      })
      .catch(e => {
        console.log(e);
      });
  };
  const autoFocus = useCallback(current => {
    if (current) {
      current.focus();
    }
  }, []);
  return (
    <div className="container">
      <Head>
        <title>Nway Sayin</title>
      </Head>
      <div className="rescueForm">
        <div className="headerContainer">
          <a className="goBackToHomePage" onClick={() => router.back()}>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </a>
          <h1 className="title">Add New Rescue</h1>
        </div>
        {!currentUser ? (
          <input
            type="text"
            name="addedBy"
            className="input-addedBy"
            placeholder="Your name"
            onChange={e =>
              setFormData({
                ...formData,
                addedBy: { username: e.target.value, verified: false },
              })
            }
            value={formData.addedBy.username}
            ref={autoFocus}
          />
        ) : (
          <div className="input-addedBy username">
            {currentUser.displayName}
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
        )}
        <RescueTagsInput
          selectedTags={tags => setFormData({ ...formData, tags: tags })}
          placeH="Supplies"
        />
        <input
          type="text"
          name="location"
          className="input-location"
          placeholder="Location"
          onChange={e => setFormData({ ...formData, location: e.target.value })}
          value={formData.location}
        />
        <textarea
          name="content"
          className="input-content"
          placeholder="Content"
          onChange={e => setFormData({ ...formData, content: e.target.value })}
          value={formData.content}
        ></textarea>
        <div className="btnContainer">
          <a className="btn" onClick={handleOnSubmit}>
            Add
          </a>
        </div>
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
            background: rgba(0, 0, 0, 0.85);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2;
          }

          .rescueForm {
            width: 300px;
            border-radius: 10px;
            background: rgba(20, 20, 20, 0.8);
            padding: 15px;
          }

          .title {
            height: 30px;
            font-family: 'Raleway', sans-serif;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 5px;
            color: #666;
            padding: 5px;
            margin: 0;
            margin-left: 30px;
          }
          .input-addedBy,
          .input-location,
          .input-content {
            width: 290px;
            font-size: 16px;
            border-radius: 0;
            background: transparent;
            padding: 5px;
            outline: none;
            border: none;
            margin-bottom: 5px;
          }
          .input-location,
          .input-content {
            font-size: 13px;
          }
          .input-content {
            height: 100px;
            overflow-y: auto;
          }
          .username {
            font-size: 14px;
            line-height: 14px;
            color: #f00;
            text-transform: uppercase;
            letter-spacing: 5px;
          }
          .input-addedBy:focus,
          .input-location:focus,
          .input-content:focus {
            border-left: 2px solid #666;
          }

          .btnContainer {
            display: flex;
            justify-content: flex-end;
          }

          .btn {
            width: 50px;
            font-size: 12px;
            text-align: center;
            text-decoration: none;
            border-radius: 3px;
            border: none;
            background: rgba(40, 40, 40, 0.8);
            color: #666;
            padding: 5px;
            margin-left: 5px;
            transition: 0.1s;
            cursor: pointer;
          }

          .btn:hover {
            background: rgba(50, 50, 50, 0.8);
          }
        `}
      </style>
    </div>
  );
};

export default AddRescue;
