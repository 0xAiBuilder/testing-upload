function Tree() {
  return (
    <code>
      {`.\n`}
      {`├── Step 1`}
      <span className="primary-color">
        {`   # React project (create-react-app)\n`}
      </span>
      {`└── Step 2`}
      <span className="primary-color">
        {`  # Truffle project`}
      </span>
    </code>
  );
}

export default Tree;
