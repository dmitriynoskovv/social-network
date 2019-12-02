import React from 'react';
import style from "./Post.module.css";

const Post = (props) => {
    return (
    <div className={style.item}>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAMFBMVEX////VSEjWTEz0zc3++vrXUVHkiYnbZGTZWVnfc3P55+f33Nz88vLwvLzonJzsrKx7lPY1AAADoUlEQVR4nO1Z2ZKjMAwE+eb8/79dSGaILCTZpOZt1Vu1DwNC7dZhWxkGg8FgMBgMBoPBYDAYDAaDwaBgWmNJOYwhlW2dHhh6t8eSA0BOcXPLd97nLY8jwHji9X/eXJ/3NX6s4PxX9uccXIEf5wiQVt8yXPZMzc51xPmR+7mMN+/vNSVdBb8Gzu40jf0q+I31/gPtQ1OS7SCsnf6norg/kEQ116AxP7g3A3hiZmJI1iKEYW8ZjqUjDLMURAxOTL91GKYmgy7/IzAMevy3GSxN/QUGXes/DYueB0XPIplBp//DcNP8c2kUUsoMrZoB5z+no48zhkonmamjEN1rC/DzTiscwH3EvPk/uu9771hcpCSSGAQfifttGX5e9sf+cqNwaXAjXjXeZSOJvYsC1O8Vsv95GqBwiblWDLIjayQNMgiVUAsA8f6GozXKMYB027i9r5urIMFUq8hqROL5Saj1+htb6TUDIQsqhYVypX3qYuB/GQidZqmiwBcCJhmk8w9lEIgGWTJ0TXmXjihpDF4aiP6HAWdY4PTFFKU81RnsEJRzT1VjXAxwM1HbJakF+ERhV89dOMScwlgi/dxF+462bgSc5FwS4DRtnFxoP4AuBijGkJjnqMS5xyqDLg1wlmfmOdK1tFfzDQOsmf64TWBwX+QBJs08fqTAXYPcZtBQ4EkOvBjAQwZ4r+FyAJdp1yXmKQPc6TiN+/uAyEC/QONOx11RcJ9QO+Fnoc/yIDUc9O4FDrWxJxpU2yEnscfLEXdDf/r88H/AAOcYsK222i/1bX27PtDNYMVv8XVev8JvB7/+kAZkbxQY1Js4f1FfqnfYq/THmxyF+5l0oOdiWPjl1dcLhgE+fSt5cK8Fci5nT2Tna/WXbveCrZrbyAyApjCd24jVSm5GsKFq9Cs9kst5ANUkydGJiyTA/XIOIa7TGYllPW549P6F1nnTYEzv8eDitkSnbWKFDaQQLoMcRmZkV+lMGfxYjiNjqc6qIvMZHiTOPAMO+qTKK3M2zT9zbxTwRzMaplX3adDYMQ8Jph4G7FbRowHbpQi0aecbIEyM2xPGHv9HFBqT0iwdV3xrxto3KT2wa2IWoZG/KGjDstAetV+YpHKE3Jg4z6IIcer3f47FWAp5b3/EcZYQn/zg8mLgp50sJsS+s+pwWFYlCWX97lcbf3TymDJASCXu8yMFzx+NSkrlMHT+iSX90Pemf2BuMBgMBoPBYDAYDAaDwWD4P/APuu4cqDlw0+QAAAAASUVORK5CYII=" />
      { props.message }
      <div>
        <span>Like {props.likeCount}</span>
      </div>
    </div>
  )
};

export default Post;