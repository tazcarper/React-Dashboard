import React from 'react';

function pageHref(num) {
    return `#page-${num + 1}`
}

export class Paginator extends React.Component {
    handlePrevious(e) {
        e.preventDefault()
        if (this.props.currentPage > 0){
        this.props.onPageChange(this.props.currentPage - 1)
        }
    }

    handleNext(e) {
        e.preventDefault();
        if(this.props.currentPage < this.props.numPages - 1) {
        this.props.onPageChange(this.props.currentPage + 1);
    }
    }

    handlePageButton(page, e) {
        e.preventDefault();
        this.props.onPageChange(page);
    }

    renderPrevious() {
        
            let showClass = ['reactable-previous-page', 'page-arrow'];
            if(!this.props.currentPage > 0) {
                showClass.push('disabled');
            }
            showClass = showClass.join(' ');
            return <a className={showClass}
                      href={pageHref(this.props.currentPage - 1)}
                      onClick={this.handlePrevious.bind(this)}>
                        {this.props.previousPageLabel || '⟨'}
                   </a>
        
    }

    renderNext() {
        
            let showClass = ['reactable-next-page', 'page-arrow'];
            if(this.props.currentPage < this.props.numPages - 1) {
            }
            else {
                showClass.push('disabled');
            }
            showClass = showClass.join(' ');
            return <a className={showClass}
                      href={pageHref(this.props.currentPage + 1)}
                      onClick={this.handleNext.bind(this)}>
                      {this.props.nextPageLabel || '⟩'}
                   </a>
        
    }

    renderPageButton(className, pageNum) {

        return <a className={className}
                  key={pageNum}
                  href={pageHref(pageNum)}
                  onClick={this.handlePageButton.bind(this, pageNum)}>
                  {pageNum + 1}
              </a>
    }

    render() {
        if (typeof this.props.colSpan === 'undefined') {
            throw new TypeError('Must pass a colSpan argument to Paginator');
        }

        if (typeof this.props.numPages === 'undefined') {
            throw new TypeError('Must pass a non-zero numPages argument to Paginator');
        }

        if (typeof this.props.currentPage === 'undefined') {
            throw new TypeError('Must pass a currentPage argument to Paginator');
        }

        let pageButtons = [];
        let pageButtonLimit = this.props.pageButtonLimit;
        let currentPage = this.props.currentPage;
        let numPages = this.props.numPages;
        let lowerHalf = Math.round( pageButtonLimit / 2 );
        let upperHalf = (pageButtonLimit - lowerHalf);
        let totalItems = this.props.totalItems;
        let itemsPerPage = this.props.itemsPerPage;
        
        for (let i = 0; i < this.props.numPages; i++) {
            let showPageButton = false;
            let pageNum = i;
            let className = "reactable-page-button";
            if (currentPage === i) {
                className += " reactable-current-page";
            }
            pageButtons.push( this.renderPageButton(className, pageNum));
        }

        if(currentPage - pageButtonLimit + lowerHalf > 0) {
            if(currentPage > numPages - lowerHalf) {
                pageButtons.splice(0, numPages - pageButtonLimit)
            } else {
                pageButtons.splice(0, currentPage - pageButtonLimit + lowerHalf);
            }
        }

        if((numPages - currentPage) > upperHalf) {
            pageButtons.splice(pageButtonLimit, pageButtons.length - pageButtonLimit);
        }
        console.log(currentPage)
        console.log(numPages)
        let leftNum = (currentPage * itemsPerPage) + 1;
        let rightNum = (currentPage * itemsPerPage) + 3;
        if (rightNum > totalItems){
            rightNum = totalItems;
        }
        return (
           
                <div className="pagination">
                        <div className="page-numbers">
                        {leftNum}
                        -
                        {rightNum}&nbsp;
                        of&nbsp;{totalItems}
                         </div>
                        <div className="page-buttons">
                        {this.renderPrevious()}
                        {this.renderNext()}
                        </div>
                   
                </div>
          
        );
    }
};

