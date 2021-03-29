import { useState } from 'react';

const RescueTagsInput = ({ selectedTags, placeH }) => {
  const [tags, setTags] = useState([]);
  const [inputText, setInputText] = useState('');
  const addTags = e => {
    if (e.key === ' ' && inputText !== '') {
      setTags([...tags, inputText]);
      selectedTags([...tags, inputText]);
      setInputText('');
    }
  };
  const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
    selectedTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };
  return (
    <div className="tags-input">
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <span>#{tag}</span>
            <i className="close" onClick={() => removeTags(index)}>
              &times;
            </i>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder={`${placeH} (press spacebar to add)`}
        onKeyUp={addTags}
        onChange={e => setInputText(e.target.value)}
        value={inputText}
      />
      <style jsx>
        {`
          .tags-input {
            display: flex;
            flex-wrap: wrap;
          }
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
            height: 5px;
            line-height: 5px;
            font-size: 12px;
            color: #666;
            border-radius: 15px;
            background: rgba(40, 40, 40, 0.8);
            padding: 10px;
            margin-right: 5px;
            margin-bottom: 5px;
          }
          input[type='text'] {
            width: 290px;
            font-size: 13px;
            border-radius: 0;
            background: transparent;
            padding: 5px;
            outline: none;
            border: none;
            margin-bottom: 5px;
          }
          input[type='text']:focus {
            border-left: 2px solid #666;
          }

          .close {
            display: block;
            width: 12px;
            height: 12px;
            text-align: center;
            font-style: normal;
            line-height: 12px;
            border-radius: 50%;
            background: #666;
            color: rgba(40, 40, 40, 0.8);
            cursor: pointer;
            margin-left: 5px;
          }
        `}
      </style>
    </div>
  );
};

export default RescueTagsInput;
