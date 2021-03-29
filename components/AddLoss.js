import Head from 'next/head';
import { useRouter } from 'next/router';

import { useContext, useState } from 'react';
import { AuthContext } from './AuthProvider';

import Services from '../firebase/services';
import { firebaseStorage } from '../firebase/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faChevronCircleLeft,
} from '@fortawesome/free-solid-svg-icons';

const AddLoss = () => {
  const router = useRouter();
  const currentUser = useContext(AuthContext);

  const defaultData = {
    name: '',
    gender: 'ko',
    fatherName: '',
    age: '',
    job: '',
    id: '',
    address: '',
    where: '',
    when: '',
    contact: '',
    additionalContent: '',
    imageURL: '',
    addedBy: {
      username: '',
      verified: false,
    },
  };

  const [formData, setFormData] = useState(defaultData);

  const handleFileChange = async e => {
    const file = e.target.files[0];
    const fileRef = firebaseStorage.ref().child(file.name);
    await fileRef.put(file);
    setFormData({ ...formData, imageURL: await fileRef.getDownloadURL() });
  };

  const handleOnSubmit = e => {
    e.preventDefault();
    const time = new Date().toString();
    Services.add({
      ...formData,
      addedBy: {
        username: currentUser
          ? currentUser.displayName
          : formData.addedBy.username,
        verified: currentUser ? true : false,
      },
      case: 'loss',
      confirmed: false,
      survey: { true: 0, false: 0 },
      reports: '',
      time,
    })
      .then(() => {
        setFormData(defaultData);
        router.push('/');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div id="addContainer">
      <Head>
        <title>Nway Sayin</title>
      </Head>
      <form id="formContainer" onSubmit={e => handleOnSubmit(e)}>
        <div className="headerContainer">
          <a className="goBackToHomePage" onClick={() => router.back()}>
            <FontAwesomeIcon icon={faChevronCircleLeft} />
          </a>
          <h2 id="title">စာရင်းအသစ်ထည့်သွင်းခြင်း</h2>
        </div>

        <div>
          <label htmlFor="name">အမည်:</label>
          <div>
            <select
              id="genderSelect"
              onChange={e =>
                setFormData({ ...formData, gender: e.target.value })
              }
              value={formData.gender}
            >
              <option value="ko">ကို</option>
              <option value="oo">ဦး</option>
              <option value="ma">မ</option>
              <option value="daw">ဒေါ်</option>
            </select>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              maxLength="60"
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              value={formData.name}
              required
            />
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="fatherName">အဖအမည်:</label>
          </div>
          <div>
            <span id="oo">ဦး</span>
            <input
              type="text"
              name="fatherName"
              id="fatherName"
              placeholder="Father Name"
              onChange={e =>
                setFormData({ ...formData, fatherName: e.target.value })
              }
              value={formData.fatherName}
              maxLength="60"
            />
          </div>
        </div>

        <div>
          <div>
            <label htmlFor="age">အသက်:</label>
          </div>
          <input
            type="text"
            name="age"
            id="age"
            placeholder="Age"
            onChange={e => setFormData({ ...formData, age: e.target.value })}
            value={formData.age}
          />
        </div>

        <div>
          <div>
            <label htmlFor="job">အလုပ်အကိုင်:</label>
          </div>
          <input
            type="text"
            name="job"
            id="job"
            placeholder="Job"
            onChange={e => setFormData({ ...formData, job: e.target.value })}
            value={formData.job}
          />
        </div>

        <div>
          <div>
            <label htmlFor="id">မှတ်ပုံတင်အမှတ်:</label>
          </div>
          <input
            type="text"
            name="id"
            id="id"
            placeholder="Id"
            onChange={e => setFormData({ ...formData, id: e.target.value })}
            value={formData.id}
          />
        </div>

        <div>
          <div>
            <label htmlFor="address">နေရပ်လိပ်စာ:</label>
          </div>
          <textarea
            name="address"
            id="address"
            placeholder="Address"
            onChange={e =>
              setFormData({ ...formData, address: e.target.value })
            }
            value={formData.address}
          ></textarea>
        </div>

        <div>
          <div>
            <label htmlFor="where">ဖမ်းဆီးခံရသည့်နေရာ:</label>
          </div>
          <textarea
            name="where"
            id="where"
            placeholder="Where he/she was seized"
            onChange={e => setFormData({ ...formData, where: e.target.value })}
            value={formData.where}
          ></textarea>
        </div>

        <div>
          <div>
            <label htmlFor="when">ဖမ်းဆီးခံရသည့်ရက်စွဲ:</label>
          </div>
          <input
            type="date"
            name="when"
            id="when"
            onChange={e => setFormData({ ...formData, when: e.target.value })}
            value={formData.when}
          />
        </div>

        <div>
          <div>
            <label htmlFor="contact">ပြန်လည်ဆက်သွယ်ပေးနိုင်ရန်:</label>
          </div>
          <input
            type="number"
            name="contact"
            id="contact"
            placeholder="Ph no."
            onChange={e =>
              setFormData({ ...formData, contact: e.target.value })
            }
            value={formData.contact}
          />
        </div>

        <div>
          <div>
            <label htmlFor="additionalContent">
              အခြားထည့်သွင်းလိုသောအကြောင်းအရာ:
            </label>
          </div>
          <textarea
            name="additionalContent"
            id="additionalContent"
            placeholder="Additional Content"
            onChange={e =>
              setFormData({ ...formData, additionalContent: e.target.value })
            }
            value={formData.additionalContent}
          ></textarea>
        </div>

        <div>
          <div>
            <label htmlFor="image">ဓါတ်ပုံ:</label>
          </div>
          <input
            type="file"
            name="image"
            id="image"
            className="custom-file-input"
            onChange={handleFileChange}
          />
        </div>

        {!currentUser ? (
          <div>
            <div>
              <label htmlFor="addedBy">သင့်အမည်:</label>
            </div>
            <input
              type="text"
              name="addedBy"
              id="addedBy"
              placeholder="Your genXYZ name"
              onChange={e =>
                setFormData({
                  ...formData,
                  addedBy: { username: e.target.value, verified: false },
                })
              }
              value={formData.addedBy.username}
              required
            />
          </div>
        ) : (
          <div className="username">
            <strong>#{currentUser.displayName}</strong>
            <FontAwesomeIcon icon={faCheckCircle} />
          </div>
        )}

        <div>
          <span id="star">* </span>
          <label htmlFor="submit">အတည်ပြုရန်နှိပ်ပါ</label>
          <br />
          <input type="submit" value="Submit" />
        </div>
      </form>
      <style jsx>
        {`
          input[type='text'],
          input[type='number'],
          textarea {
            width: 100%;
          }
          .username {
            font-size: 9px;
            font-family: 'Raleway', sans-serif;
            line-height: 14px;
            color: #f00;
            text-transform: uppercase;
            letter-spacing: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default AddLoss;
