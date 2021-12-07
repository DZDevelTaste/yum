import React from 'react';

const disease = () => {
    
    const diCode;
    const diName;

    return (
        <div>
            <span>병명 </span>
            <input type='text'/>
            <br />
            <div>
                <div>
                    질병 코드
                </div>
                <div>
                    병명
                </div>
            </div>
            <div>
                <div>
                    {diCode}
                </div>
                <div>
                    {diName}
                </div>
            </div>
            <div>
                증상
                <input type='text' />
            </div>
        </div>
    );
};

export default disease;