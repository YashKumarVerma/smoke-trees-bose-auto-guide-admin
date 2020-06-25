import React from "react";
import Moment from "react-moment";
import { DateTimeFormat } from "../../scripts/config";
class UserCard extends React.Component {
  render() {
    const { name, businessName, mobileNumber, createdAt } = this.props;
    return (
      <div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
              Business : {businessName}
            </h6>
            <p class="card-text">
              Mobile : {mobileNumber}
              <br />
              User Since : <Moment date={createdAt} format={DateTimeFormat} />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCard;
