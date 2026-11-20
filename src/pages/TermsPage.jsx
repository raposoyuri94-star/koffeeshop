import React from 'react';
import { location } from '../data/location';
import { instagram } from '../data/social';

export default function TermsPage() {
  return (
    <section className="terms-page section-space" aria-labelledby="terms-heading">
      <div className="terms-content">
        <a className="text-link terms-back" href={`${import.meta.env.BASE_URL}#home`}>Voltar ao início</a>
        <p className="handwritten">Informações do website</p>
        <h1 id="terms-heading">Termos e Condições</h1>
        <p className="terms-intro">
          Aqui encontra as condições de utilização do website da Kofeeshop e informações
          sobre o menu, os serviços externos e a sua privacidade.
        </p>

        <section aria-labelledby="terms-about">
          <h2 id="terms-about">Sobre este website</h2>
          <p>
            Este website apresenta a Kofeeshop, o seu menu, fotografias e informações para
            uma visita à loja em {location.street}, {location.city}. Pode consultar os
            conteúdos sem criar uma conta.
          </p>
        </section>

        <section aria-labelledby="terms-menu">
          <h2 id="terms-menu">Menu, preços e disponibilidade</h2>
          <p>
            Os preços apresentados no menu estão em meticais moçambicanos (MT).
            Os produtos, preços e campanhas podem mudar. Confirme os valores e a
            disponibilidade directamente com a loja antes de fazer um pedido,
            sobretudo no caso de bebidas sazonais e cartazes de campanhas anteriores.
          </p>
          <p>
            As fotografias apresentam os produtos e momentos da marca. A apresentação
            dos produtos pode variar. Para esclarecer ingredientes, tamanhos ou opções
            de preparação, fale com a equipa da loja.
          </p>
        </section>

        <section aria-labelledby="terms-allergies">
          <h2 id="terms-allergies">Alergias e necessidades alimentares</h2>
          <p>
            Se tiver uma alergia, intolerância ou outra necessidade alimentar, informe
            a equipa antes de encomendar ou consumir. Confirme os ingredientes, a
            preparação e a possibilidade de contacto com alergénios directamente na loja.
            As imagens do menu não substituem essa confirmação.
          </p>
        </section>

        <section aria-labelledby="terms-events">
          <h2 id="terms-events">Encomendas, reservas e eventos</h2>
          <p>
            O website não processa encomendas, pagamentos ou reservas online.
            As opções apresentadas para eventos são exemplos. Quantidades, preços,
            datas, horários e necessidades alimentares devem ser combinados
            directamente com a loja. Consultar o website ou abrir os detalhes de
            eventos não confirma uma encomenda ou reserva.
          </p>
        </section>

        <section aria-labelledby="terms-content">
          <h2 id="terms-content">Utilização dos conteúdos</h2>
          <p>
            O logótipo, as fotografias e os restantes materiais pertencem aos respectivos
            titulares. Pode consultar o website e partilhar ligações para as suas páginas.
            A reutilização dos materiais deve respeitar os direitos dos titulares e as
            licenças aplicáveis. Para utilizar materiais da marca para fins comerciais,
            contacte a loja.
          </p>
        </section>

        <section aria-labelledby="terms-privacy">
          <h2 id="terms-privacy">Privacidade e serviços externos</h2>
          <p>
            Este website não inclui contas de utilizador, formulários de recolha de dados
            pessoais ou ferramentas próprias de análise de visitas. O código do website
            não utiliza cookies próprios nem guarda preferências no seu navegador.
          </p>
          <p>
            O alojamento é fornecido pelo GitHub Pages, que regista endereços IP de
            visitantes para fins de segurança. Pode consultar a{' '}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">
              política de privacidade do GitHub
            </a>.
          </p>
          <p>
            O mapa integrado é fornecido pelo Google Maps. Ao carregar o mapa, o seu
            navegador liga-se à Google, que pode tratar dados técnicos, como o endereço
            IP, e utilizar cookies de acordo com a sua{' '}
            <a href="https://policies.google.com/privacy?hl=pt" target="_blank" rel="noopener noreferrer">
              política de privacidade
            </a>.
          </p>
          <p>
            As ligações para o Instagram e para o website da Nexzo_agency encaminham
            para serviços externos, que têm os seus próprios termos e políticas de
            privacidade. Ao contactar a loja pelo Instagram, o tratamento da mensagem
            também está sujeito à{' '}
            <a href="https://privacycenter.instagram.com/policy/" target="_blank" rel="noopener noreferrer">
              política de privacidade do Instagram
            </a>.
          </p>
        </section>

        <section aria-labelledby="terms-availability">
          <h2 id="terms-availability">Disponibilidade e alterações</h2>
          <p>
            Os conteúdos podem ser actualizados para acompanhar alterações no menu,
            nas campanhas ou no funcionamento da loja. O acesso ao website pode ser
            interrompido por manutenção ou falhas técnicas. Estas condições podem
            ser revistas quando o funcionamento do website mudar; consulte esta
            página para conhecer a versão em vigor.
          </p>
          <p>
            Estas condições não limitam os direitos do consumidor previstos na
            legislação aplicável em Moçambique.
          </p>
        </section>

        <section aria-labelledby="terms-contact">
          <h2 id="terms-contact">Contactos</h2>
          <p>
            Para questões sobre produtos, preços, eventos ou os conteúdos deste
            website, contacte a Kofeeshop pelo Instagram{' '}
            <a href={instagram.url} target="_blank" rel="noopener noreferrer">{instagram.handle}</a>{' '}
            ou visite a loja.
          </p>
          <address>
            <a href={location.mapsUrl} target="_blank" rel="noopener noreferrer">
              {location.street}<br />{location.city}
            </a>
          </address>
          <p>
            Desenvolvimento do website:{' '}
            <a href="https://raposoyuri94-star.github.io/nexzo-agency-website/" target="_blank" rel="noopener noreferrer">
              Nexzo_agency
            </a>.
          </p>
        </section>
      </div>
    </section>
  );
}
