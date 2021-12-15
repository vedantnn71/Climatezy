const Details = ({ humid, sky, wind }) => {
  const InfoCard = ({ name, data, cls }) => {
    return (
      <div
        className={`${
          cls !== undefined || cls === "" ? cls : name.toLowerCase()
        } extra-box`}
      >
        <h5 className="extra-heading heading heading-small">{name}</h5>
        <hr className="sep" />
        <h5 className="extra-info heading heading-small">{data}</h5>
      </div>
    );
  };

  return (
    <div className="extra-container">
      <InfoCard name="Humidity" data={humid} />
      {typeof sky !== "undefined" ? (
        <InfoCard name={sky.main} data={sky.data} cls="sky" />
      ) : (
        <h5 className="extra-info heading heading-small">Loading</h5>
      )}
      <InfoCard name="Wind" data={wind} />
    </div>
  );
};

export default Details;
