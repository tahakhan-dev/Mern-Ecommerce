import React from "react";
import { Link } from "react-router-dom";
import NothingFound from "../routes/nothingFound";

const SubList = ({ subs }) => {
  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
      >
        <Link to={`/sub/${s.slug}`}>{s.name}</Link>
      </div>
    ));

  return (
    <div className="container">
      <div className="row">
        {subs.length > 0 ? (
          showSubs()
        ) : (
          <h4>
            <NothingFound />
            No sub Categories found
          </h4>
        )}
      </div>
    </div>
  );
};

export default SubList;
