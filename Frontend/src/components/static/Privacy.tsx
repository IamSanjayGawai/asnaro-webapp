import { useNavigate } from "react-router-dom";
const Privacy = () => {

  const router = useNavigate();

  const scrollToTop = () => {
    router("/");
  };

  const goToEnquiry = () => {
    router("/contact");
  }
  return (
    <div className="md:max-w-[1024px] xs:mt-[24px] md:mt-0 md:pt-[50px] pb-[100px] mx-auto xs:px-4 sm:px-6 md:px-8 text-tertiary">
      <div className="grid grid-cols-24 gap-y-8">
        <div className="col-span-24 text-[24px] font-bold text-tertiary">
          個人情報保護方針
        </div>
        <div className="grid grid-cols-24 gap-y-5 col-span-24 text-base">
          <div className="col-span-24">
            株式会社丸菱製作所
            (以下「弊社」といいます。)は、「個人情報の保護に関する法律」(以下「個人情報保護法」といいます。)」や
            その他の法令規範等を遵守し、弊社が提供するインターネットサイト「ASNARO」（以下「本サイト」といいます。）において
            お預かりするお客様の個人情報について、その取得、利用、第三者提供及び保管に加え、
            本人からの開示、停止、利用停止、削除の請求又は問合せ等を受けた場合の対応を、次のとおり、
            ASNAROプライバシーポリシー(以下「本ポリシー」といいます。)としてまとめ、個人情報管理体制を確立し、継続的な改善に取り組んでまいります。
          </div>
        </div>
        <div className="grid grid-cols-24 gap-y-5 col-span-24 text-base">
          <div className="col-span-24 font-bold">
            第１条 本ポリシーの適用範囲
          </div>
          <div className="col-span-24 grid grid-cols-24">
            <div className="col-span-24">
              １
              弊社が提供する本サイトのサービス（以下「本サービス」といいます。）に関して適用されます。
            </div>
            <div className="col-span-24">
              ２
              弊社は、本サービスにおいて、お客様の個人情報を、その利用目的の達成に必要な範囲において取り扱います。弊社は、個人情報保護法で定める例外に該当する場合を除き、お客様に示した利用目的を超えてお客様の個人情報を利用しません。
            </div>
          </div>
        </div>
        <div className="grid grid-cols-24 gap-y-3 col-span-24 text-base">
          <div className="col-span-24 font-bold">第２条 個人情報の定義</div>
          <div className="col-span-24 grid grid-cols-24">
            <div className="col-span-24">
              １
              「個人情報」とは、生存する個人に関する情報であって、次の各号に掲げるものをいいます。
            </div>
            <div className="col-span-24">
              （１）当該情報に含まれる氏名、生年月日、その他の記述等により特定の個人を識別することができるもの
            </div>
            <div className="col-span-24">
              （２）メールアドレス、ID、パスワード、クレジットカード情報、銀行口座情報等、その情報のみでは個人を識別できない場合であっても、他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるもの
            </div>
            <div className="col-span-24">
              ２
              「個人データ」とは、個人情報データベース等を構成する個人情報をいいます。
            </div>
            <div className="col-span-24">
              ３
              弊社の事業遂行上、サービスの利便性を高める目的で、クッキー、IPアドレス、取引の履歴、端末で使用中のOS・機種等を取得することがあります。これらの情報は単独では特定の個人を識別することができないため、第１項で定義する「個人情報」とはなりません。ただし、これらの情報も、他の情報と結びつくことで個人が識別できるようになる場合には、第１項で定義する「個人情報」を構成するものと考えます。
            </div>
          </div>
        </div>
        <div className="grid grid-cols-24 gap-y-3 col-span-24 text-base">
          <div className="col-span-24 font-bold">
            第３条 個人情報の取得及び収集
          </div>
          <div className="col-span-24 grid grid-cols-24">
            <div className="col-span-24">
              弊社は、本サービス提供の過程で、法令等のルールやガイドラインに従い、個人情報を適正かつ適法な方法によって取得します。
            </div>
          </div>
        </div>
        <div className="grid grid-cols-24 gap-y-3 col-span-24 text-base">
          <div className="col-span-24 font-bold">第４条 利用目的等</div>
          <div className="col-span-24 grid grid-cols-24">
            <div className="col-span-24">
              １
              弊社は、法令等のルールやガイドラインに従い、個人情報を、次の各号に掲げる利用目的の範囲内で利用します。
            </div>
            <div className="col-span-24">
              （１）弊社の商品やサービスを提供するため
            </div>
            <div className="col-span-24">
              （２）弊社の商品やサービス、各種キャンペーンのご案内、規約やポリシー変更の通知を行うため
            </div>
            <div className="col-span-24">
              （３）弊社のサービスの運営、管理のため
            </div>
            <div className="col-span-24">
              （４）マーケティング、市場調査の実施などにより商品及びサービスの改善や研究開発を実施するため
            </div>
            <div className="col-span-24">
              （５）お客様からのお問い合わせへの応答、サービスの利用状況のご報告、緊急時のご連絡その他お客様との間での必要な連絡を行うため
            </div>
            <div className="col-span-24">
              （６）弊社の提供する商品やサービスの保守及びサポートを実施するため
            </div>
            <div className="col-span-24">
              （７）金融機関の口座情報の確認、振込状況の確認などを実施するため
            </div>
            <div className="col-span-24">
              （８）お客様と弊社との取引状況を管理するため
            </div>
            <div className="col-span-24">（９）お客様の本人確認のため</div>
            <div className="col-span-24">
              （１０）弊社のサービスに関する利用規約、ポリシーに違反する行為への対応のため
            </div>
            <div className="col-span-24">
              （１１）前各号に付随する目的のため
            </div>
            <div className="col-span-24">
              ２
              弊社では、原則として、個人情報を取得するに際し、あらかじめその利用目的を通知又は公表いたします。ただし、次の各号に掲げる場合にはこの限りではありません。
            </div>
            <div className="col-span-24">
              （１）お客様又は第三者の生命、身体、財産その他の権利利益を害するおそれがある場合
            </div>
            <div className="col-span-24">
              （２）弊社の正当な権利や利益を害するおそれがある場合
            </div>
            <div className="col-span-24">
              （３）国の機関又は地方公共団体が法令の定める事務を遂行することに対して協力する必要がある場合であって、利用目的をお客様に通知し、又は公表することにより当該事務の遂行に支障を及ぼすおそれがある場合
            </div>
            <div className="col-span-24">
              （４）取得の状況から利用目的が明らかであると認められる場合
            </div>
            <div className="col-span-24">
              ３
              弊社は、取得した個人情報の利用目的を変更前の利用目的と関連性があると合理的に認められる範囲を超えては変更せず、利用目的を変更する場合には、変更後の利用目的について、お客様に通知又は公表します。
            </div>
          </div>
        </div>
        <div className="grid grid-cols-24 gap-y-3 col-span-24 text-base">
          <div className="col-span-24 font-bold">第５条 安全管理措置等</div>
          <div className="col-span-24 grid grid-cols-24">
            <div className="col-span-24">
              １
              弊社は、個人データの漏えい、改ざん、滅失又は棄損を防止するため、保管手続の運用整備や保管システムのセキュリティ向上を図り、役職員を指導、管理及び監督する等、必要かつ適切な安全管理措置を講じます。。
            </div>
            <div className="col-span-24">
              ２
              弊社は、個人データの取扱いの全部又は一部を、外部事業者に委託する場合があります。この場合、個人データの安全管理が図られるよう、委託先の事業者に対して、必要かつ適切な管理監督を実施いたします。
            </div>
          </div>
        </div>
        <div className="grid grid-cols-24 gap-y-3 col-span-24 text-base">
          <div className="col-span-24 font-bold">第６条 第三者提供</div>
          <div className="col-span-24 grid grid-cols-24">
            <div className="col-span-24">
              １
              弊社では、原則として本人の同意を得ずに、個人データを第三者に提供することはありません。ただし、次の各号に掲げるの場合には、法令に抵触しない範囲で、本人の同意を得ることなく、第三者に個人データを提供することがあります。
            </div>
            <div className="col-span-24">（１）法令に基づく場合。</div>
            <div className="col-span-24">
              （２）お客様又は第三者の生命、身体、財産その他の権利利益を害するおそれがある場合であって、お客様の同意を得ることが困難であるとき
            </div>
            <div className="col-span-24">
              （３）公衆衛生の向上又は児童の健全な育成の推進のために特に必要がある場合であって、お客様の同意を得ることが困難であるとき
            </div>
            <div className="col-span-24">
              （４）国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、お客様の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
            </div>
            <div className="col-span-24">
              ２ 次の各号に掲げる場合は前項の「第三者」には該当しません。
            </div>
            <div className="col-span-24">
              （１）弊社が利用目的の達成に必要な範囲内において、個人データの取扱いの全部又は一部を委託する場合
            </div>
            <div className="col-span-24">
              （２）合併その他の事由による事業の承継に伴って個人データが提供される場合
            </div>
            <div className="col-span-24">
              （３）個人データを特定の者との間で共同して利用する場合であって、その旨並びに共同して利用される個人データの項目、共同して利用する者の範囲、利用する者の利用目的及び当該個人データの管理について責任を有する者の氏名又は名称について、あらかじめ本人に通知し、又は本人が容易に知り得る状態に置いているとき
            </div>
          </div>
        </div>
        <div className="grid grid-cols-24 gap-y-3 col-span-24 text-base">
          <div className="col-span-24 font-bold">
            第７条 提供先等の記録作成義務
          </div>
          <div className="col-span-24 grid grid-cols-24">
            <div className="col-span-24">
              １
              弊社は、前条第１項各号及び第２項各号に該当する場合を除き、個人データを第三者に提供したときは、個人情報保護委員会規則で定めるところにより、当該個人データを提供した年月日、当該第三者の氏名又は名称その他の個人情報保護委員会規則で定める事項に関する記録を作成するものとします。
            </div>
            <div className="col-span-24">
              ２
              弊社は、当該記録を、当該記録を作成した日から個人情報保護委員会規則で定める期間保存するものとします。
            </div>
          </div>
        </div>
        <div className="grid grid-cols-24 gap-y-3 col-span-24 text-base">
          <div className="col-span-24 font-bold">
            第８条 訂正、利用停止、削除、開示等の請求
          </div>
          <div className="col-span-24 grid grid-cols-24">
            <div className="col-span-24">
              １
              弊社では、個人データが事実でないという理由によって、本人から訂正、追加又は削除(以下「訂正等」といいます。)の申出があった場合には、請求者が本人であることを確認の上、他の法令の規定により特別の手続きが定められている場合を除き、利用目的の達成に必要な範囲内において、遅滞なく必要な調査を行い、その結果に基づき、個人データの内容の訂正等を行い、その旨本人に通知します。
            </div>
            <div className="col-span-24">
              ２
              弊社は、本人から、その個人データが、利用目的の範囲を超えて取り扱われているという理由又は偽りその他不正の手段により取得されたものであるという理由により、その利用の停止又は消去（以下「利用停止等」といいます。）の申出があった場合には、請求者が本人であることを確認の上、遅滞なく必要な調査を行い、その結果に基づき、個人データの利用停止等を行い、その旨本人に通知します。ただし、個人データの利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合であって、
              本人の権利利益を保護するために必要なこれに代わるべき措置をとることができる場合は、この代替策を講じます。請求が個人情報保護法の定める要件を満たさない場合、ご希望に添えない場合があります。また、対応に別途費用をいただく場合がございます。
            </div>
            <div className="col-span-24">
              ３
              弊社では、個人データについて、本人から開示の申出があった場合には、弊社所定の手続に従って、適切かつ迅速に対応いたします。ただし、次の各号に掲げる場合には、本人から開示の請求があった場合でも、その全部又は一部を開示しないことがあります。開示をしない決定をした場合には、その旨を遅滞なく、本人に通知します。
            </div>
            <div className="col-span-24">
              （１）他の法令に違反することとなる場合
            </div>
            <div className="col-span-24">
              （２）本人又は第三者の生命、身体、財産その他の権利利益を害するおそれがある場合
            </div>
            <div className="col-span-24">
              （３）弊社の業務の適正な実施に著しい支障を及ぼすおそれがある場合
            </div>
            <div className="col-span-24">
              ４
              個人データの訂正等・利用停止等・開示の請求の窓口については、第１１条の問合せ窓口までご連絡ください。
            </div>
          </div>
        </div>
        <div className="grid grid-cols-24 gap-y-3 col-span-24 text-base">
          <div className="col-span-24 font-bold">第９条 継続的改善</div>
          <div className="col-span-24 grid grid-cols-24">
            <div className="col-span-24">
              弊社では、個人情報の適切な取扱いに努めるため、本ポリシーの改訂を含め、役職員への研修の実施、個人情報保護管理体制の随時見直しなど、継続的な改善を推進します。
            </div>
          </div>
        </div>
        <div className="grid grid-cols-24 gap-y-3 col-span-24 text-base">
          <div className="col-span-24 font-bold">第１０条 本ポリシーの変更</div>
          <div className="col-span-24 grid grid-cols-24">
            <div className="col-span-24">
              本ポリシーは、弊社の判断によりお客様の同意なしに全部又は一部の変更を行うことができるものとし、本ポリシー変更後にお客様が弊社サービスを利用等した場合には、当該変更に同意したものとみなします。
            </div>
          </div>
        </div>
        <div className="grid grid-cols-24 gap-y-3 col-span-24 text-base">
          <div className="col-span-24 font-bold">第１１条 問合せ窓口</div>
          <div className="col-span-24 grid grid-cols-24">
            <div className="col-span-24">
              ＜個人情報の取扱いその他本ポリシーに関するお問合せ＞
            </div>
            <div className="col-span-24">
              〒486－0807愛知県春日井市大手町字川内1045番地
            </div>
            <div className="col-span-24">株式会社丸菱製作所</div>
            <div className="col-span-24 mb-4">情報セキュリティ担当窓口</div>
            <div className="col-span-24 text-primary cursor-pointer underline"
             onClick={goToEnquiry}>問合せフォームはこちら</div>
          </div>
        </div>
      </div>
      <div className="mt-[100px] flex justify-center items-center">
        <button
          onClick={scrollToTop}
          className="text-white bg-tertiary py-3 rounded xs:w-1/2 md:w-1/3 lg:w-1/4 h-full"
        >
          トップページに戻る
        </button>
      </div>
    </div>
  );
};

export default Privacy;
