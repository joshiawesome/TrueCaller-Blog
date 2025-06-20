import React from "react";
import { Dispatch, RootState } from "../../store";
import { connect } from "react-redux";

import Paginator from "../reusables/Paginator";

import { APIConstants } from "../../constants/APIConstants";

import "../../styles/ContentFooter.css";

export const Footer = (props: StateProps & DispatchProps) => {
  const { activePage, updateActivePage } = props;

  const handlePageSelect = (pageNumber: number) => updateActivePage(pageNumber);

  return (
    <div className="content-footer">
      <Paginator
        onPageChange={handlePageSelect}
        totalCount={APIConstants.TOTAL_NUMBER_OF_POSTS}
        currentPage={activePage}
        pageSize={APIConstants.POSTS_PER_PAGE}
      />
    </div>
  );
};

const mapState = (state: RootState) => ({
  activePage: state.activePage,
});

const mapDispatch = (dispatch: Dispatch) => ({
  updateActivePage: dispatch.activePage.update,
});

type StateProps = ReturnType<typeof mapState>;
type DispatchProps = ReturnType<typeof mapDispatch>;

export default connect(mapState, mapDispatch)(Footer);
