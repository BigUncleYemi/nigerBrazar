import React from 'react';
import {StyleSheet, Dimensions, Animated} from 'react-native';
import {View, Icon, IconButton} from 'native-base';
import Image from './Image';
import {ExpandingDot} from 'react-native-animated-pagination-dots';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';

const {width} = Dimensions.get('screen');

const datas = [
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
    backgroundColor: '#7bcf6e',
  },
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/11192830/media/7690704fa8f0566d572a085637dd1eee.jpg?compress=1&resize=1200x1200',
    backgroundColor: '#4654a7',
  },
  {
    image:
      'https://cdn.dribbble.com/users/3281732/screenshots/9165292/media/ccbfbce040e1941972dbc6a378c35e98.jpg?compress=1&resize=1200x1200',
    backgroundColor: '#7370cf',
  },
];

const ImageCarosel = ({data = datas, navigation}) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const keyExtractor = React.useCallback((_, index) => index.toString(), []);
  const [activeIndex, setActiveIndex] = React.useState(0);
  let flatListRef = React.useRef(null);
  const onViewRef = React.useRef(({viewableItems}) => {
    setActiveIndex(viewableItems[0].index);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});
  const options = {
    title: 'Product name',
    message: 'Product name',
  };
  const onShare = () => {
    Share.open(options)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };
  const renderItem = React.useCallback(() => {
    return (
      <View>
        <View py={2} px={3} shadow={2}>
          <Image
            alt="Product Image"
            source={{
              uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMQEhUQEhIVFRUXFxYYFRcYFRcVFxUXFhcYFhUXFRUYHSggGBolHhUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGBAQGi0lHSUtLS0tLS0tLS8tLS0tKystLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLy0tLS0tLS0tLf/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAABBAMBAAAAAAAAAAAAAAAAAQMEBQIGBwj/xABPEAABAwIDAgcKCQsDAwUBAAABAAIRAyEEEjEFQQYTIjNRYXEHFBdUcoGRk7HSIzJCUlOSocHRFRYkYnOClKOy0/Ciw+E0Q0RVY4PC8SX/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAPxEAAgECAwIKBwYEBwAAAAAAAAECAxEEITESQRMUUWFxgZGhsdEFFTJSksHhIiMzU7LwQ3LS8QY0QkRUYmP/2gAMAwEAAhEDEQA/AOuIQhalgQhCAEJEqAEJESgFTdQWWcrGobISMISSiVJIqEkolAKhJKVACEIQAhJKJQCoSSllACESiUAIRKAgBCEqARCVCARCVIgBCEICUhCFBUEiVIgMKj4smjUPSirqm6hUosc37o3dBxGEr964bK0ta1z3uaHmXXDWg2AiCSQdd0X16pw22w1hqGtTyhrXTkw+jxmECJ0WfCjYFXaW2nYWiQHOZTLnO+KxjabczjFzuEDeRpqrg9w54v3/AE/4d2//AORbXppK5zPbcn5mqeE3afjDfU0vdSO7pe0j/wCQ31NL3VtvgPf/AOo0/UH+6svAXV8fZ/Du/uKdukUtV5TTvCTtL6dvqaXurLwk7S+nb6ml7q2/wF1fH2fw7v7iPAXU8fZ/Du/uJwlL9om1XlNO8JO0vp2+ppe6puE4b7WqtfUZVbkYHFzjToNAytzEXbcxuHSFsngLq+Ps/h3f3FQcNe5dW2bhziuPZWY0tD4YabmZiGtIBc6RJA1GqKVNuyt2D7xZtvtJWG4R7ZqOe2niMO/iwxzzOGa2HguEF+UusDIGlukTvfADhMdo4bjXtDajHmnUj4pIDXBzb2BDhbpBXHMJwSq1KVOpmaDUIFNtjJc1z2BxmW5g21iLiSJW/dxR36NW/b/7dNUlstO2qNKbldXvmdKc5aFieFVerVyUcrQXQ0ZWkkaAuLt5st4qusuRP1PavNxtSUdlRdr3+R9R/h/CUq8qrqRTso2urrPa3dRf4jhDjGAFz2CZjksOnYEz+dWJ+e36rfwVJdC891qvvPtZ9KvR2F30ofBHyZefnTifnj6rfwR+dWJ+e36rfwVGslThqvvy7WPV+E/Jh8EfIuhwqxPzx9RqljhFiPnj6jfwWtKbQPJCmNer7z7WZVMBhVa1KHwx8jYqO08U4B2djQ4wC4NG4nSJi3RvTjNq4pjBXc6m5k6SyTePitOYaG8LXRKUFacYn7z7TD1fQf8ADhb+ReK38/cdMwtcVGNcNHAEecSn1WbFPwTPIb7ArNe3F3SZ8RUiozaW5sEIQpKAhCEAIQhASkIQoKghCEAzWG9R6qlVNFEqqUSji3DDblbAbZfiqBAe1tMQ4S1zXUmgtcARIPaNArM92zFEQcLhv5nvKh7otJr9qva9+Rp4kOfE5QWNl0SJjokKmqbGpMewOxdPi3ZvhGtLgDTYHVIEjMJJa0g8oiIBkDo2YtK63HJJy2nblN1HdqxI0wmG/wBfvJzw34zxbD/zPeWlv2FREgY6gTeDm5JiZkiSJi3TI0VPjKIY9zGvDw0kB40cNxHaip03u8SrlNftHTPDfjPFsP8AzPeR4b8Z4th/5nvLliFbgYchHCy5Tqfhvxni2H/me8qHhf3SsXtKj3s9lKlSJBeGB0vymWgucTyQQDA3gX3LSle7G2EMRQfWzVJZVpMytp5pa8gEtcSA59/iC9pgzaODhHOwU5yyuM4fhDXpsaxryCwsLHb25AWtEaGx+wdC6P3FR+jVv2/+3TWpt4Fst+kOu6u0RSkfBVTTaSQ45QcuZxNmSM0WJ2zuKH9Grft/9umqS2Nl7K3q5vT2tpbXIdErLnWxsBVqte6nxcF7WBr7FzzLmtaCIJOU6rotbRctwe1qtEObScAC6ZytJBAIDmOIJYYcRIg3Xl4xez1/I+r/AMPxlKNdRtf7vXTWf78ifQw+IeW/ANAdlIJpQ0B7oaSYsJnr1TeN2BiAH1DT0e5rg1hbFmkODQOSw5hB+xYDhNiQAM7bANHIZoIjd1BY/nFiIjO0dByMzNkQcrolsi1ty4XGPOfRKGIUrpQt16dn0+bZ2NXDiziamYZZGUzyzDbdZssqmxqzKbqtRhY1rmt5QIkkus214LXSn6fCbEtu17QQQYFOmAIcXWAbAuSe0lRKm06r6YoEgttHJbms5zozRmgF7yBPyiqOMS64x/qUVmtNrTfu15NddciMxpJgKe0QIWFCllHXvTqoTOVya9xp0Aabgyo8n4TKHloDohgO+AT+8JmITNCo+rQFWqAKoqOY5wbkFQAuyvLdxhoP73RCi1aTKjQ2oxr2g5gDmBa7TMxzSHMNhcETAnQLNsNaGNAa1sw0TALruJJJJJ3kkkrZzjwezv6DyIYSssZwzl9npfZbT+19WdA2LzTPIb7FaKr2LzTPIb7FaL2oeyug+RrfiS6X4ioQhWMwSJUiAEIQgJSEgKVQVBIhI50ISN1juUaqnSU1VUknBu6e/LtKo61m0tdObbqtW79HRT1N4E3M6hdUoCeFFGb/APGEeQut4vHOhvEvpEkuADw4h+U5SA9phpm0mbrWVbYSyvkc6pbcnnbPV6dp5PrYwO1yC4NgBoITXGDpHpXr3BY7jqTKrWmHtDokAtO9pnoNlKpOJ1bl03gz6FHGebv+hE8O4ycZarU8cB4O8elHGDpHpC9Md0+mHUcHIB//AKGD1E61IP2EhbHtXEuYwllSnTdIDTUaXNJ1IhrgdAd6lYjTLv8AoV4Fcp5E4wdI9KQvb0j0heuNl7SfVp5jTh7Xvp1GhwID2Eg5SYkGxHUVObUcTBYQOmW2UyruLacc+kKiuU8cgt6vs3LsHcVP6NW/b/7bF0HuptB2TjJH/a+0OEKTiAAKIFgKTIHQqSrbcdDSnT2ZXuM19Fw3bO1eIcAG5iZOsABdxr6Lz9wirup1mPb8ZuYiQDvO4rB04zqQjLNZ+B7eDxNXDYPE1KTtL7pXsnrKS33Rj+c5+hH1/wDhH50H6EfX/wCFHPCGtechkuJ+DZfNE7uodgskbt6sCTLLkk/Bt1IAO62n3aARvxOl7i7WcXr70h+c/hh5En86D9CPr/8ACcp8KXNM8SD+8fwUGpt6s4EEs5Uz8GyeVMxa2uuoVWnEqD1h3vzKy9PekH/Gfwx/pNn/ADyf9CPrH8Efnk/6EfWP4LWEJxHD+73vzM/XeP8AzX2R/pNn/PJ/0I+sfwVhsbhIa9QUnUw2ZggzcDNcR0ArSFbcGT+l0z1P/pKyr4KgqU2o5pN6vcuk6sF6Yxs8TShOpdOUU8o6OST3HoLYvNM8hvsCtFVbE5pnkN9gVqkPZXQYVvxJdL8RUJEKxmKkQhACEIQAsg89KxQgMjUKxJQhACaqp1N1UByrEY6nh+EtKtWe2nTbGZ7jDW5sK5oknS7gPOt/qbdwILhT2rhmMe4ucOMpOc1zjLzSfm5EzvDoOkKm2z3L6e0arsW7Evpl8DKKbXAZBk1J3xKheA6l47U9U33kmqc7XeiKU61Wk3s7+h9zTXX5s2p+2tkkUx3/AIcCmzI0DEU/i5mOuZmZptv277pobT2QGGmNo0cpj/yabjanxYu6ToP8FlrPgOpeO1PVN95L4DqXjtT1TfeTZp+8+wzcptttZvnLHh/wpwD6WEZSxdCpkxuEe4MqNeWspvlznBugAGquto8JsG92antfC0xEFrnUarbTymguBa65GpGllqfgOpeO1PVN95L4DqXjtT1TfeVo8HF3T7VfxViLy5O82entfZPFNpO2jQdlc97nHEUs1R9Rr2vc89fGOsI3DSyz/LmypefyjQ5fxvh6Qnlmp7XG+o6VqvgOpeO1PVN95J4DqXjtT1TfeUPYbbcnfoF5cha8OeEmzzsrEYahjaNRxpZWNFYVHuJcLaku7VeYbatDFNpvoVWVWtpta4scHZXROV0aG4sVp3gOpeO1PVN95X3Bvgi3ZTXUW1XVQ93GS5obFg2IBPzftS0LZPMvDavmi5rLz7wzpZajLzZ3tK9BVlwPhwJqs7He0qkW+MU0uSXgj0IX4hiUv/L9TNZQnRyes+zrSCruNx/mi9Gy3nh7K3sbQnHM3i4/zXoSBm/QdaWY2GdZ7lHBXB4vBmtXwnHvOJdTJzvGRgpNcDAIESf9Wui2pvAjAFpJ2SQYEN418knLInNEjM68xyTfeuFYXF1KLSWVqjGk6U6j6eZ3XEblMq7bxL2Ma3EYmW5rce8g5jPIEyOsElc06ctq9zrjDJLfyb30arvz3XyvsXdc2Dh8HUw3e9DiOMpOc9mZzuUHAD4xtqejsWqcGP8Aqqf7/wDQVFxT6tQ56jqjyBGZ5LiB0S7dc+lSeDX/AFNP9/8ApKisrYeavf7MvBlsImsbRurfbh+pHoTYvNM8hvsCtVV7F5qn5DfYFaLCHsroOit+JLpfixUIQrGYiEIQAhCEAIQhACEIQAm6qcTVVAWmx+bb2u9pTNbarmPLDh6x6HNbmabkbtNAfOndjc23td7Sq/afCujh6opOBMmC4FpA5QZcTM5ibR8k9U4yaWpVRcm7EkbZMx3vXF4vTMfJuSJgXdpPxD0iUq7Zc2Zw1cxrlZm846dO3SAVOOMaGtc4wHXvui5JIsAOnTS90jdpUSYFamTMRnbrcRr1H0KSo5hK3GMDi0tmeS4QRBIv6FIUH8qUbzVYIMEE5TPYbxcXWVHaNF8BtWmS74oDhJ7BM7j6FFgS4UMYy8GlU1I+LIsYmehTUIWi0tVcj0K2fNyXNgxyhE9Y6lV7Y5xvk/eVdlUe1+cb5P3lTHUZXyIdZcD4c86zsd7V3ysuC8ND8My08k+1Sv8AMU+iXgjtgr4HELnpfqkaus2MJMASpAqOIlwDhMbhp0RosHExYQCY1udNT5wvQuzx1CGt8uS1n81136hOJcLj0ggx6NEvEn4zyQOvU9gTQaRDh5jO+3vD0oLDqd+/0e8Ez5QpQS9l9DeXTkl8ukcdVns0jq/zesS4W5I9J/FIaZgGLHT/ADzhIWmFZO2SKucpXbzM2vvIJafSrPYZHfNMj9eRuHJKqnUyLxr90j7irDYHJxFMusOWf9Lh7QVjic6U/wCWXg+o68BN8ZpR/wC8O3aWfy5+y3oTYnM0/Ib/AEhWiqthuBo0yN9Nn9IVquWHsroOit+JLpfixUJEKxmCEIQAhCEAIhCEAIhCEAQm6oTiaqoC02Pzbe13tK1bbnAx2JqVXHJlJz0oc5sPnMHPbFyHR07+lbRsfm29rvaVDxfCrCUXmk+uA9tiMrnQeglrSJWE9nVl6NOtOTVKLk+ZN5dRJw+ziKFKi7i3FjWgy3M0kNy2B03p3vK85aUgyPgxY9M7ipGHrtqMa9jg5rgCCNCDoQnvOpRi73zIjMBT1NOmTeTkbvJ6v1j6Ss6eCptMtpsBGhDWiI00CfB60sIQKorGVLSR16Xtfd0+1SYRCFZRuNUg4C5k9kbvxlVO1+cb5P3lXZVJtjnG+T95Ux1LRVsiFWXBuGtJxqMcASLjSbzvXeK+i1KtwFxTjdjfWN/FUrTlTqQnGN7X77HrYKlSrUK1GpUUNrYs3zOT36/U4i8E/Jjsn70OBMcmI6Jv2rs57n2K+jHrB+KxPc7xX0bfWNVvWE/y+/6FH6Gw/wDyY93mcZeS7c0dk/eipJ3Adkrq9fuZYwuJa1sH/wB0edN+DDHfMb61v4rZYt29nx8i3qXDP/dR7vM5Y8E7gOyb9qHTM5fNuXVPBjjfmN9aPxR4MMd8xvrR+Kcbfu97J9S4a1uNR7vM5ZN5yjsgx7VM2OCazXZbXnKDF2xvXSPBljfmN9cFnT7muNHyG+taqTxTlFrZ152b4X0ThaVenUeJj9mSlbLc78rN34PcxR/Zs/pCuFWbJw7qVNlN4hzWtDhM3aIN9+is1aPso8mq71JNcr8QQhCkoCEIQAhCEABCAlQCJUiVACbqpxN1UBZbH5tva72laHtHZ2KZVxAZh83GVnvD+JFaASS0tzHKDc/JnrW97H5tva72lWC55wUtTqweOlhZSaipJ2unzO6Ne2bsg950KVZpzMaCQHlpa6DN2m5glv7ylYfY7GEOawtMuMGq+CSHC7ZIIhxselW6FZZKyOSrN1Jym9W2+13KT8hU5gU3BoECKrwMszGUO05It1nSSrprYAHQlQhQRxgWEqIytVgE04mJGYWsCftkeYdNpiEJTS3EfDVHOBzsyncJmRH/AOqs2xzjfJ+8q7KpNsc43yfvKmOpN7yuQcRornaFHEOcDRqsa0RIczNNzN93yftVNX0V5isRUY4BtE1GwLh7RBJ0IcRYaz1q0hIiU6OLvNSnfTpHnyRNomIvMWypx9LFDLlqMPxs2YfrtLQMrRPIDmza7pvELJ2Nq6jDuIvIzsDpBIsDYtMazvFr2k4Ss9856RpxGrmunWYynTTXpVSpGwFPEh81n0y2DZu48iL5R0P9IVmhCgAhCZxVQsY5zWlxAkNGp6ggG8QKkgsLQIuHAmT5tEjBVluYsi+aAZJvpJsIhRvyhU8XfqBMiCJaJ6d5Om7tjPC46o9wa6g5gIu4mwtobeZLFtvK1l2FZV5x/lO9pTqaq84/yne0p1bLQsCEIQAhCEAIQhAASpAlQCJUiVACaqp1NVUBZbH5tva72lcxx5qVatfM8u4zFYuiCQ0uosacgcTlDmtEQ0AO1kneunbH5tva72lVW09s7PZUc2sGOe0w4miXmRuzZTJCz4CpW+zTTb5lcqpbMrsb4NPrDAYaas1Awtc58uzluZoJMEkWncSLzrNox2IkHjKJbmvlpVJgEzBzEToL9Cm4Ouyoxr6ZBY4AtiwjdA3dikqNMit75lIX4gOc0VaWp+NTc4gXgS0tEW7bntUjC08UC3jKlEgRmhjg46zBzQN25WUJUBi5wFyojdoUzEO1gizt4BG7rCmpvix0DqsoLR2d/iN0MQ2oCWmRpoR7VV7X5xvk/eVchoAsIVNtjnG+T95Vo6jK+RBxGi2Oph2uIJmYixI9i1yvornHglzQKzqfY0GdRqRr+HnUyEiS3DNF+V03cTvnQlL3u2Ii0z/noVeWuLjkxLhmd8UsDoubAnQXH1e1IKNV0EYogwWn4NsEySCQdDBaOuFUqWHezZJi5IOu8GQpCh4GsMrWl5e75xblnU7raKYoA1VbmBBm4IsSDfoIuD1hM0cE1hkGobfKq1HD0OcQpD3AAk6C5Ub8pUfpGqHbea01Vaahe2+1++xJ4sdfpP4oDY6fSVUUDUf8XFNdE5uQ3Q6R0EQb9J0iyewmHrBzS/Eh4Au3i2tzHLEyLi91Jm04uzVmV9XnH+U72lOpqpzj/Kd7SnVstC4IQhACEIQAhCEAIQEqARCEqARN1U6m6qAsdjc23td7StF2tsfGtrYjiqJcyo97g4FujnE2ki8GLretj823td7SpTqzQYLmg9EgH2rShi3hm3ZNPl/ujKcNrLwKXZuxv0ShRrU2ucxvKaXGATJIlpg9CkDYVIgfBAQ4m73kyXB2s3EtaY0VwELCc3KTk9W2+0JWViLTD2w1rWhoENvuExv6gpaRCoSIdLKE2rVhpLBuzC1rAm+bpkb93mnIQlO24j4V7yDnAB3Qd0DrO+VWbX5xvk/eVdlUe1+cb5P3lTHUm93chV9FsjqzQcpc0GJgkTHTHmK1uvornH4BtVzS6lTfAsXat10MaHTzq0hImsqBwBBBB0gzPYnFW4fZ7GODm4ekwjQtiQLi0AbifSpbC+LgTN+zq61QqPoUeakmzYkRrpN/PCkIAQsKswYEmLCYnz7lG4yv9HT9a7+2obLwpuelutpeLRINQaSJ7UNqA6OB6LqqqbOLnmo7D0S46k1XHcBpxfQ0J3BbNYwtfxTWvaMoh7nQAMoAJAnkx/gUppidOUNbdTT8LlfV5x/lO9pTqaqc4/yne0p1bLQkEIQgBCUUys20ulAN5SlUhCXIuRglSBKhIiVIlQAm6qcTdQICx2Pzbe13tKqKhYDVD5z8Y+BlN2kiDmjti+9Wmxqoy5JuCbdRvP2qzlcGLwyrpLLK+qus1bS68S9Ktwbllrz2+TKjiHOpU4fUYRfki/nHZ0+2IVmEqSHcdVdyXNuGtEl+YOLZFxAbbcraVV4vbBpvLO9sQ+PlMY0tNpscwW1OChCMFuSXYYyltSb5RnCYaqypL61V4DjAygNLQ1wAPSbkzb5PQrtUv5fPieL9U330fl4+KYv1TffVyC4c6BKiU8dIByPExq3SQDf0/YUbPx/HAniqtOI5xobM9EEypkoWTW9EfDV84PJc2LcoRuB+9Vm1+cb5P3lXRKodo1Q+pyTMCCd0ySrR1GTlkRa+ivcXjeLIHF1HC12NLgJno7L9oVHXFle0y2qA9r3C2gPtHSpkJDLNpg/9mv8AGY29Nw+P8rqaIv0LGhtTPPwNZpBaCCwiznBuboIEkk/qlTRR/XcfOPwSCllHxnGJOsk20VSpIQtfpbXLYPe2NPaxp/8Aunvy+fE8X6pvvqAXSFRVNtkggYXFiQRIpskdYlxEqbgGOLQ8vrcofEqCmC3tDWi/nQskrN3MKu1Q15p8XVJBiQyWk5cwh0xFwJMX7DC4XajajgwU6okTLmQ3Sbmf8NlPy/rH7PwWLyGjM51h0xCFSgq84/yne0p1MZ8z3OGhcSPOU+tloaAn6bI7U1SbvT6MhglQhQQCEIQEUIQhSWBKkQgFWLglQgIVahKYOD6lZwkypYFZ3n1I7z6lZ5UZVFgVnefUk7zVplRlSwKvvNHeatMqMqWBWswimUaUJ/KiFNgYvaodXDSp6SEBVd6Je81Z5VnRpjVRYFezAAdqz70VplCMoUWBV96I70VplCMoUWIKzvNZswY6FPyhZQpsBinQATgphZpVIESoQhAIQhACEIQEVCEKSwIQhACEIQAhCEAIQhACEIQAhCEAIQhACEIQAnaOiEIQx1CEKCAQhCARCVCAEIQgBCEIAQhCAEIQgP/Z',
            }}
            style={styles.Aimga}
            borderRadius={20}
          />
        </View>
      </View>
    );
  }, []);

  return (
    <View style={[styles.container]}>
      {navigation && (
        <View style={styles.leftActionBtn}>
          <IconButton
            variant="solid"
            icon={
              <Icon
                size="sm"
                as={<Ionicons name="arrow-back-sharp" />}
                color="black"
              />
            }
            backgroundColor="white"
            borderRadius={100}
            onPress={() => navigation.goBack()}
            p={2}
          />
        </View>
      )}
      <View style={styles.rightActionBtn}>
        <IconButton
          variant="solid"
          icon={
            <Icon
              size="sm"
              as={<Ionicons name="share-social" />}
              color="black"
            />
          }
          backgroundColor="white"
          borderRadius={100}
          p={2}
          onPress={onShare}
        />
      </View>
      <Animated.FlatList
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        decelerationRate={'normal'}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: false,
          },
        )}
      />
      <ExpandingDot
        data={data}
        expandingDotWidth={15}
        scrollX={scrollX}
        inActiveDotOpacity={0.3}
        dotStyle={styles.EDot}
        activeDotColor={'#c2410c'}
        containerStyle={styles.EConc}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  EDot: {
    width: 10,
    height: 10,
    backgroundColor: '#fdba74',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  EConc: {
    bottom: -20,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    margin: 20,
    fontWeight: '700',
  },
  buttonText: {
    color: '#fff',
  },
  Aimga: {
    width: width * 0.94,
    height: width * 0.8,
  },
  rightActionBtn: {
    position: 'absolute',
    zIndex: 2,
    top: 18,
    right: 18,
  },
  leftActionBtn: {
    position: 'absolute',
    zIndex: 2,
    top: 18,
    left: 18,
  },
});

export default ImageCarosel;
