import KeyboardDoubleArrowSharpLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import styled from 'styled-components';

// Style
const pageNavigationStyle = {
    display: "flex",
    flexDireciton: "row",
    alignItems: 'center',
    gap: ".75em",

    '&:hover': {
        backgroundColor: "red",
    }
}

const muiIconSX = {
    cursor: "pointer",
    height: '24px',
    width: '24px',
    transition: 'all 0.3s',

    '&:hover': {
        color: 'rgb(163, 118, 217)',
        height: '36px',
        width: '36px',
    }
}

const PageNavigation = function (props) {
    const PageButtonItems = () => {
        const items = []

        let lowerEnd = Math.max(props.currentPage - props.offset, 1)
        let upperEnd = Math.min(props.currentPage + props.offset, props.pageCount)

        // Make sure that the amount of buttons is always the same
        const buttonCount = upperEnd - lowerEnd + 1
        if (props.currentPage <= props.offset) {
            upperEnd = Math.min(
                upperEnd + (1 + props.offset * 2) - buttonCount,
                props.pageCount
            )
        } else if (props.currentPage > props.pageCount - props.offset) {
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
                    active={page === props.currentPage}
                    selectPage={() => props.setCurrentPage(page)} />
            )
        }

        return items
    }

    return (
        <div className="pageNavigation" style={pageNavigationStyle}>
            {
                props.currentPage > 1 &&
                (
                    <>
                        <KeyboardDoubleArrowSharpLeftIcon
                            sx={muiIconSX}
                            onClick={() => props.setCurrentPage(1)} />
                        <ArrowBackSharpIcon
                            sx={muiIconSX}
                            onClick={() => props.setCurrentPage(props.currentPage - 1)} />
                    </>
                )
            }
            {PageButtonItems()}
            {
                props.currentPage < props.pageCount &&
                (
                    <>
                        <ArrowForwardSharpIcon
                            sx={muiIconSX}
                            onClick={() => props.setCurrentPage(props.currentPage + 1)} />
                        <KeyboardDoubleArrowRightSharpIcon
                            sx={muiIconSX}
                            onClick={() => props.setCurrentPage(props.pageCount)} />
                    </>
                )
            }

        </div>

    )
}

const PageButton = function (props) {
    // Style
    const Button = styled.button `
        border: 1px solid rgb(163, 118, 217);
        border-radius: 50px;
        height: 48px;
        width: 48px;
        color: ${props.active ? '#FFF' : '#2F2F2F'};
        background-color: ${props.active ? 'rgb(163, 118, 217)' :'rgb(255,255,255)'};
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