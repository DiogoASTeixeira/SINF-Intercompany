import React from 'react';

export default function Cell({
    content,
    header,
    fixed
}) {
    const fixedClass = fixed ? ' Cell-fixed' : '';
    const headerClass = header ? ' Cell-header' : '';

    const className = (
        `Cell${fixedClass}${headerClass}`
    );

    const cellMarkup = header ? (
        <th className={className}>
            {content}
        </th>
    ) : (
            <td className={className}>
                {content}
            </td>
        );

    return (cellMarkup);
}

