import KeyboardDoubleArrowSharpLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import styled from 'styled-components';

// Style
const pageNavigationStyle = {
    display: 'grid',
    gridTemplateColumns: "1fr 1fr 1fr",
    alignItems: 'center',
    gap: ".75em",
    color: 'white',


    'div': {
        
    }
}

const leftNavStyle = {
    justifySelf: 'end',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: ".5em",
}

const buttonPagesStyle = {
    gridColumn: '2 / 3',
    justifySelf: 'center',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: ".75em",
}

const rightNavStyle = {
    justifySelf: 'start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: ".5em",
}

const muiIconSX = {
    cursor: "pointer",
    height: '24px',
    width: '24px',
    transition: 'all 0.3s',

    '&:hover': {
        color: 'rgb(212, 184, 245)',
        height: '36px',
        width: '36px',
    }
}

const PageNavigation = function (props) {
    let currentPageNum = typeof (props.currentPage) !== "number"
        ? Number(props.currentPage)
        : props.currentPage

    const PageButtonItems = () => {
        const items = []

        let lowerEnd = Math.max(currentPageNum - props.offset, 1)
        let upperEnd = Math.min(currentPageNum + props.offset, props.totalPages)

        // Make sure that the amount of buttons is always the same
        const buttonCount = upperEnd - lowerEnd + 1
        if (currentPageNum <= props.offset) {
            upperEnd = Math.min(
                upperEnd + (1 + props.offset * 2) - buttonCount,
                props.totalPages
            )
        } else if (currentPageNum > props.totalPages - props.offset) {
            lowerEnd = Math.max(
                lowerEnd - (1 + props.offset * 2) + buttonCount,
                1
            )
        }

        for (let page = lowerEnd; page <= upperEnd; page++) {
            items.push(
                <PageButton
                    key={['page', page].join('-')}
                    toPage={page}
                    active={page === currentPageNum}
                    selectPage={() => props.setCurrentPage(page)} />
            )
        }

        return items
    }

    return (
        <div className="pageNavigation" style={pageNavigationStyle}>
            {
                currentPageNum > 1 &&
                (
                    <div style={leftNavStyle}>
                        <KeyboardDoubleArrowSharpLeftIcon
                            sx={muiIconSX}
                            onClick={() => props.setCurrentPage(1)} />
                        <ArrowBackSharpIcon
                            sx={muiIconSX}
                            onClick={() => props.setCurrentPage(currentPageNum - 1)} />
                    </div>
                )
            }
            <div className='btn-pages' style={buttonPagesStyle}>{PageButtonItems()}</div>
            {
                currentPageNum < props.totalPages &&
                (
                    <div style={rightNavStyle}>
                        <ArrowForwardSharpIcon
                            sx={muiIconSX}
                            onClick={() => props.setCurrentPage(currentPageNum + 1)} />
                        <KeyboardDoubleArrowRightSharpIcon
                            sx={muiIconSX}
                            onClick={() => props.setCurrentPage(props.totalPages)} />
                    </div>
                )
            }

        </div>

    )
}

const PageButton = function (props) {
    // Style
    const Button = styled.button`
        border: 1px solid rgb(163, 118, 217);
        border-radius: 50px;
        height: 48px;
        width: 48px;
        color: ${props.active ? '#FFF' : '#2F2F2F'};
        background-color: ${props.active ? 'rgb(163, 118, 217)' : 'rgb(255,255,255)'};
        padding: .5em 1em;
        box-shadow: 0px 6px 6px -3px rgba(140, 84, 208, 0.7);
        cursor: pointer;

        transition: all .3s;

        &:hover {
            transform: scale(1.1);
            background-color: rgb(140, 84, 208);
            color: #FFF;
        }
    `


    return (
        <Button
            type="button"
            onClick={props.selectPage}>{props.toPage}</Button>
    )
}

export default PageNavigation